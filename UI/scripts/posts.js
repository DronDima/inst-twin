class PostModel {
  static get SYSTEM_FIELDS() {
    return ['id', 'author', 'createdAt', 'likes'];
  }

  constructor(posts) {
    this.restoreFromLocalStorage();
    if (this._photoPosts == null) {
      this._photoPosts = posts;
      this._savePosts();
    }
    if (this._authStatus == null) {
      this._authStatus = false;
      this._saveAuthStatus();
    }
  }

  static _isIntersect(postTags, configTags) {
    return postTags.some(postTag => configTags.some(configTag => configTag === postTag));
  }

  addAll(posts) {
    const notValid = [];
    posts.forEach((post) => {
      if (this.addPhotoPost(post) === false) {
        notValid.push(post);
      }
    });
    if (posts.length !== notValid.length) {
      this._savePosts();
    }
    return notValid;
  }

  static _filtrate(post, config) {
    const postCreatedAt = new Date(post.createdAt);
    const configDateFrom = new Date(config.dateFrom);
    const configDateTo = new Date(config.dateTo);
    return !!(postCreatedAt.getTime() >= configDateFrom.getTime()
      && postCreatedAt.getTime() <= configDateTo.getTime()
      && (post.author === config.authorName || config.authorName === '')
      && (PostModel._isIntersect(post.hashtags, config.hashtags)
        || config.hashtags.length === 0));
  }

  static _sortByTime(a, b) {
    const aTime = new Date(b.createdAt).getTime();
    const bTime = new Date(a.createdAt).getTime();
    return aTime - bTime;
  }

  getPhotoPosts(skip = 0, count = 10, config = PostModel._DEFAULT_FILTER_CONFIG) {
    const filtratedPosts = this._photoPosts
      .filter(post => PostModel._filtrate(post, config))
      .sort((a, b) => PostModel._sortByTime(a, b));
    return filtratedPosts.slice(skip, skip + count);
  }

  getPhotoPost(id) {
    return this._photoPosts.find(post => post.id === id);
  }

  static _validateChangeableFields(post) {
    return !(!Object.prototype.hasOwnProperty.call(post, 'description')
      || post.description.length >= 200
      || typeof post.description !== 'string'
      || !Object.prototype.hasOwnProperty.call(post, 'photoLink')
      || typeof post.photoLink !== 'string'
      || post.photoLink === ''
      || !Object.prototype.hasOwnProperty.call(post, 'hashtags'));
  }

  _validateUnChangeableFields(post) {
    return !(!Object.prototype.hasOwnProperty.call(post, 'id')
      || typeof post.id !== 'string'
      || this.getPhotoPost(post.id)
      || !Object.prototype.hasOwnProperty.call(post, 'createdAt')
      || !Object.prototype.hasOwnProperty.call(post, 'author')
      || typeof post.author !== 'string'
      || post.author === ''
      || !Object.prototype.hasOwnProperty.call(post, 'likes'));
  }

  _validatePhotoPost(post) {
    return !(this._validateUnChangeableFields(post) === false
      || PostModel._validateChangeableFields(post) === false);
  }

  addPhotoPost(post) {
    if (this._validatePhotoPost(post)) {
      this._photoPosts.push(post);
      this._savePosts();
      return true;
    }
    return false;
  }

  removePhotoPost(id) {
    const index = this._photoPosts.findIndex(post => post.id === id);
    if (index !== -1) {
      this._photoPosts.splice(index, 1);
      this._savePosts();
      return true;
    }
    return false;
  }

  editPhotoPost(id, edits) {
    const post = this.getPhotoPost(id);
    if (post !== undefined) {
      const postCopy = Object.assign(post);
      const fields = Object.keys(edits);
      fields.forEach((field) => {
        if (PostModel.SYSTEM_FIELDS.indexOf(field) === -1) {
          postCopy[field] = edits[field];
        }
      });
      if (PostModel._validateChangeableFields(postCopy) === true) {
        this.removePhotoPost(id);
        this.addPhotoPost(postCopy);
        this._savePosts();
        return true;
      }
      return false;
    }
    return false;
  }

  getPostsCount(config = PostModel._DEFAULT_FILTER_CONFIG) {
    return this.getPhotoPosts(0, this._photoPosts.length, config).length;
  }

  _saveAuthStatus() {
    const jsonAuthStatus = JSON.stringify(this._authStatus);
    localStorage.setItem('authStatus', jsonAuthStatus);
  }

  isAuthorized() {
    return this._authStatus;
  }

  toggleAuthStatus() {
    this._authStatus = !this._authStatus;
    this._saveAuthStatus();
  }

  _savePosts() {
    localStorage.removeItem('posts');
    const jsonPosts = JSON.stringify(this._photoPosts);
    localStorage.setItem('posts', jsonPosts);
  }

  restoreFromLocalStorage() {
    try {
      const jsonPosts = localStorage.getItem('posts');
      this._photoPosts = JSON.parse(jsonPosts);
    } catch (e) {
      this._photoPosts = null;
    }
    try {
      const jsonAuthStatus = localStorage.getItem('authStatus');
      this._authStatus = JSON.parse(jsonAuthStatus);
    } catch (e) {
      this._authStatus = null;
    }
  }
}
PostModel._DEFAULT_FILTER_CONFIG = {
  dateFrom: '-271821-04-20T00:00:00.000Z',
  dateTo: '+275760-09-13T00:00:00.000Z',
  authorName: '',
  hashtags: [],
};

class View {
  constructor(main) {
    this._hashtagTemplate = document.querySelector('.hashtag-template');
    this._postTemplate = document.querySelector('.post-template');
    this._main = main;
  }

  showHashtags(hashtags) {
    this._variants = document.querySelector('.filter__variants');
    hashtags.map(this._buildHashtag.bind(this))
      .forEach(hashtag => this._variants.appendChild(hashtag));
  }

  _hashtagListener() {
    this.classList.toggle('filter__variant_hide');
    const span = document.createElement('span');
    span.classList.add('filter__tag');
    span.classList.add('hashtag');
    span.innerHTML = this.innerHTML;
    const input = document.querySelector('.filter__tags-input');
    input.parentNode.insertBefore(span, input);
    input.focus();
  }

  _buildHashtag(hashtag) {
    const fragment = document.importNode(this._hashtagTemplate.content, true);
    const variant = fragment.querySelector('.filter__variant');
    variant.textContent = `#${hashtag}`;
    variant.addEventListener('click', this._hashtagListener);
    return fragment;
  }

  showPosts(posts, countSuitablePosts) {
    posts.map(this._buildPost.bind(this))
      .forEach(post => this._main.appendChild(post));
    const currentPostCount = this._main.querySelectorAll('.post-container').length;
    const loadMoreButton = document.querySelector('.main__button');
    if (currentPostCount < 10 || currentPostCount === countSuitablePosts) {
      loadMoreButton.setAttribute('hidden', 'true');
    } else if (loadMoreButton.hasAttribute('hidden')) {
      loadMoreButton.removeAttribute('hidden');
    }
  }

  static closeDialogWindow() {
    const deleteDialog = document.getElementById('delete-dialog');
    deleteDialog.close();
  }

  static toggleAddEditForm() {
    document.querySelector('main').classList.toggle('hidden');
    document.querySelector('.filter-container').classList.toggle('filter-container_hidden');
    document.querySelector('.add-post-container').classList.toggle('add-post-container_hidden');
  }

  _buildPost(post) {
    const fragment = document.importNode(this._postTemplate.content, true);
    const key = fragment.querySelector('.post-container').getAttribute('data-id');
    fragment.querySelector('.post-container').setAttribute('data-id', post[key]);
    fragment.querySelector('.post-container__photo').setAttribute('src', post.photoLink);
    const dateTime = new Date(post.createdAt);
    fragment.querySelector('.post-container__name').textContent = `${dateTime.toLocaleString()}, ${post.author}`;
    fragment.querySelector('.post-container__hashtag').textContent = post.hashtags.join(', ');
    fragment.querySelector('.post-container__desc').textContent = post.description;
    return fragment;
  }

  clearPosts() {
    while (this._main.lastElementChild.classList.contains('post-container')) {
      this._main.removeChild(this._main.lastElementChild);
    }
  }

  static toggleBlur() {
    document.querySelector('.wrapper').classList.toggle('wrapper_blured');
  }

  static showSignupDialog() {
    const signinDialog = document.getElementById('signin-dialog');
    if (typeof signinDialog.showModal === 'function') {
      signinDialog.showModal();
      View.toggleBlur();
    } else {
      alert('The dialog API is not supported by this browser');
    }
  }

  static toggleVariants() {
    setTimeout(() => {
      document.querySelector('.filter__variants').classList.toggle('filter__variants_hidden');
    }, 100);
  }

  static focusTagsInput() {
    this.lastElementChild.focus();
  }

  static showFilter(event) {
    event.currentTarget.parentNode.querySelector('.filter__form').classList.toggle('filter__form_hidden');
    const symbol = event.currentTarget.querySelector('.filter__symbol').firstElementChild;
    if (!symbol.classList.replace('fa-angle-down', 'fa-angle-up')) {
      symbol.classList.replace('fa-angle-up', 'fa-angle-down');
    }
  }

  static resizePost(event) {
    if (document.documentElement.clientWidth > 610) {
      let { target } = event;
      while (target !== event.currentTarget) {
        if (target.classList.contains('post-container')) {
          target.classList.toggle('post-container_big');
          target.querySelector('.post-container__desc').classList.toggle('post-container__desc_big');
          target.querySelectorAll('.post-container__link')
            .forEach(link => link.classList.toggle('post-container__link_big'));
          target.querySelector('.post-container__hashtag').classList.toggle('post-container__hashtag_big');
          const coordY = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo(0, coordY);
          return;
        }
        target = target.parentNode;
      }
    }
  }

  static showElementsIfAuthorized(isAuthorized) {
    const links = document.querySelectorAll('.post-container__links');
    const buttons = document.querySelectorAll('.header__button');
    const logInfo = document.querySelector('.header__logInfo');
    if (isAuthorized === true) {
      /* Header buttons and name. */
      logInfo.innerHTML = 'You signed in as username.';
      buttons[0].classList.remove('header__button_hidden');
      buttons[1].classList.add('header__button_hidden');
      buttons[2].classList.remove('header__button_hidden');
      /* Links for deleting and editing posts. */
      links.forEach(link => link.classList.remove('post-container__links_hidden'));
    } else {
      /* Header buttons and name. */
      logInfo.innerHTML = 'You not signed in.';
      buttons[0].classList.add('header__button_hidden');
      buttons[1].classList.remove('header__button_hidden');
      buttons[2].classList.add('header__button_hidden');
      /* Links for deleting and editing posts. */
      links.forEach(link => link.classList.add('post-container__links_hidden'));
    }
  }
}
