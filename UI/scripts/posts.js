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

  getPhotoPosts(skip = 0, count = 10, config = PostModel._DEFAULT_FILTER_CONFIG) {
    // FIXME: Выводить время в удобном формате.
    function filtrate(posts) { // FIXME: Сделать красивее.
      return posts
        .filter(post => new Date(post.createdAt).getTime() >= new Date(config.dateFrom).getTime()
          && new Date(post.createdAt).getTime() <= new Date(config.dateTo).getTime()
          && (post.author === config.authorName || config.authorName === '')
          && (PostModel._isIntersect(post.hashtags, config.hashtags)
            || config.hashtags.length === 0));
    }
    function sort(posts) {
      return posts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    const filtratedPosts = sort(filtrate(this._photoPosts));
    return filtratedPosts.slice(skip, skip + count);
  }

  getPhotoPost(id) {
    return this._photoPosts.find(post => post.id === id);
  }

  getPostIndex(id) {
    return this.getPhotoPosts().findIndex(post => post.id === id);
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
        if (PostModel.SYSTEM_FIELDS.indexOf(field) !== -1) {
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
  // TODO: AddEdit как SPA.
  constructor() {
    this._hashtagTemplate = document.querySelector('.hashtag-template');
    this._postTemplate = document.querySelector('.post-template');
    this._main = document.querySelector('.main');// FIXME: main через констр
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

  removePost(id) {
    const post = this._main.querySelector(`.post-container[data-id="${id}"]`);
    this._main.removeChild(post);
  }

  editPost(editedPost) {
    const lastPost = this._main.querySelector(`.post-container[data-id="${editedPost.id}"]`);
    this._main.replaceChild(this._buildPost(editedPost), lastPost);
  }

  _buildPost(post) {
    const fragment = document.importNode(this._postTemplate.content, true);
    const key = fragment.querySelector('.post-container').getAttribute('data-id');
    fragment.querySelector('.post-container').setAttribute('data-id', post[key]);
    fragment.querySelector('.post-container__photo').setAttribute('src', post.photoLink);
    fragment.querySelector('.post-container__name').textContent = `${post.createdAt.toLocaleString()}, ${post.author}`;
    fragment.querySelector('.post-container__hashtag').textContent = post.hashtags.join(', ');
    fragment.querySelector('.post-container__desc').textContent = post.description;
    return fragment;
  }

  clearPosts() {
    while (this._main.lastElementChild.classList.contains('post-container')) {
      this._main.removeChild(this._main.lastElementChild);
    }
  }

  static showElementsIfAuthorized(isAuthorized) {
    const links = document.querySelectorAll('.post-container__links');
    if (isAuthorized === true) {
      /* Header buttons and name. */
      // FIXME: toggle hidden.
      document.querySelector('.header__logInfo').innerHTML = 'You signed in as username.';
      const buttons = document.querySelectorAll('.header__button');
      buttons[0].removeAttribute('hidden');
      buttons[1].setAttribute('hidden', 'true');
      buttons[2].removeAttribute('hidden');
      /* Delete and edit links. */
      links.forEach(link => link.classList.remove('post-container__links_hidden'));
    } else {
      /* Header buttons and name. */
      document.querySelector('.header__logInfo').innerHTML = 'You not signed in.';
      const buttons = document.querySelectorAll('.header__button');
      buttons[0].setAttribute('hidden', 'true');
      buttons[1].removeAttribute('hidden');
      buttons[2].setAttribute('hidden', 'true');
      /* Delete and edit links. */
      links.forEach(link => link.classList.add('post-container__links_hidden'));
    }
  }
}
