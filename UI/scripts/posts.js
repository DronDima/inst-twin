class PostModel {
  constructor(posts) {
    this.restoreFromLocalStorage();
    if (this._photoPosts == null) {
      this._photoPosts = posts;
      this._savePosts();
    }
  }

  static _isIntersect(postTags, configTags) {
    let result = false;
    postTags.forEach(tag1 => configTags.forEach((tag2) => {
      if (tag1 === tag2) {
        result = true;
      }
    }));
    return result;
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
    function filtrate(posts) {
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
    const result = [];
    let number = 0;
    for (let i = skip; number < count && i < filtratedPosts.length; i += 1) {
      result.push(filtratedPosts[i]);
      number += 1;
    }
    return result;
  }

  getPhotoPost(id) {
    const result = {
      post: undefined,
      index: undefined,
    };
    result.post = this.getPhotoPosts().find(post => post.id === id);
    result.index = this.getPhotoPosts().findIndex(post => post.id === id);
    if (result.post !== undefined) {
      return result;
    }
    return undefined;
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
    if (this._validatePhotoPost(post) === true) {
      this._photoPosts.push(post);
      this._savePosts();
      return true;
    }
    return false;
  }

  removePhotoPost(id) {
    const modelIndex = this._photoPosts.findIndex(post => post.id === id);
    const viewIndex = this.getPhotoPosts().findIndex(post => post.id === id);
    if (modelIndex !== -1) {
      this._photoPosts.splice(modelIndex, 1);
      this._savePosts();
      return viewIndex;
    }
    return viewIndex;
  }

  editPhotoPost(id, edits) {
    const { post } = this.getPhotoPost(id);
    if (post !== undefined) {
      const postCopy = Object.assign(post);
      const fields = Object.keys(edits);
      fields.forEach((field) => {
        if (field !== 'id' && field !== 'author' && field !== 'createdAt' && field !== 'likes') {
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

  _savePosts() {
    localStorage.removeItem('posts');
    const jsonPosts = JSON.stringify(this._photoPosts);
    localStorage.setItem('posts', jsonPosts);
  }

  restoreFromLocalStorage() {
    const jsonPosts = localStorage.getItem('posts');
    this._photoPosts = JSON.parse(jsonPosts);
  }
}
PostModel._DEFAULT_FILTER_CONFIG = {
  dateFrom: '-271821-04-20T00:00:00.000Z',
  dateTo: '+275760-09-13T00:00:00.000Z',
  authorName: '',
  hashtags: [],
};

class View {
  constructor() {
    this._hashtagTemplate = document.querySelector('.hashtag-template');
    this._postTemplate = document.querySelector('.post-template');
    this._main = document.querySelector('.main');
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

  _buildPost(post) {
    const fragment = document.importNode(this._postTemplate.content, true);
    fragment.querySelector('.post-container__photo').setAttribute('src', post.photoLink);
    fragment.querySelector('.post-container__name').textContent = `${post.createdAt.toLocaleString()}, ${post.author}`;
    fragment.querySelector('.post-container__hashtag').textContent = post.hashtags.join(', ');
    fragment.querySelector('.post-container__desc').textContent = post.description;
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
      document.querySelector('.main__button').removeAttribute('hidden');
    }
  }

  removePost(index) {
    const posts = this._main.querySelectorAll('.post-container');
    this._main.removeChild(posts[index]);
  }

  editPost(editedPost) {
    const posts = this._main.querySelectorAll('.post-container');
    this._main.replaceChild(this._buildPost(editedPost.post), posts[editedPost.index]);
  }

  addPost(post, index) {
    const posts = this._main.querySelectorAll('.post-container');
    this._main.insertBefore(this._buildPost(post), posts[index]);
  }

  clearPosts() {
    while (this._main.lastElementChild.classList.contains('post-container')) {
      this._main.removeChild(this._main.lastElementChild);
    }
  }

  static showElementsIfAuthorized(isAuthorized) {
    const delEditTemplate = document.querySelector('.del-edit-template');
    const targets = document.querySelectorAll('.post-container__links');
    if (isAuthorized === true) {
      /* Header buttons and name. */
      document.querySelector('.header__logInfo').innerHTML = 'You signed in as dronchenko.';
      const buttons = document.querySelector('.header__buttons');
      const button2 = buttons.querySelector('.header__button');
      const button1 = document.createElement('button');
      button1.classList.add('header__button', 'button');
      button1.setAttribute('type', 'submit');
      button1.innerHTML = 'Add post';
      buttons.insertBefore(button1, button2);
      button2.innerHTML = 'Sign out';
      button2.onclick = '';
      /* Delete and edit links. */
      targets.forEach((target) => {
        const links = document.importNode(delEditTemplate.content, true);
        target.appendChild(links);
      });
    } else {
      /* Header buttons and name. */
      document.querySelector('.header__logInfo').innerHTML = 'You not signed in.';
      const buttons = document.querySelector('.header__buttons');
      if (buttons.children.length > 1) {
        buttons.removeChild(buttons.firstElementChild);
        buttons.querySelector('.header__button').innerHTML = 'Sign in';
      }
      /* Delete and edit links. */
      targets.forEach((target) => {
        while (target.hasChildNodes() === true) {
          target.removeChild(target.firstChild);
        }
        target.appendChild(delEditTemplate);
      });
    }
  }
}
