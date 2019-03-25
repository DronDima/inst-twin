class PostModel {
  constructor(posts) {
    this._photoPosts = posts;
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
    return notValid;
  }

  getPhotoPosts(skip = 0, count = 10, config = PostModel._DEFAULT_FILTER_CONFIG) {
    function filtrate(posts) {
      return posts
        .filter(post => post.createdAt.getTime() >= config.dateFrom.getTime()
          && post.createdAt.getTime() <= config.dateTo.getTime()
          && (post.author === config.authorName || config.authorName === '')
          && (PostModel._isIntersect(post.hashtags, config.hashtags)
            || config.hashtags.length === 0));
    }
    function sort(posts) {
      return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
    const result = this._photoPosts.find(post => post.id === id);
    if (result !== undefined) {
      return result;
    }
    return result;
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
      return true;
    }
    return false;
  }

  removePhotoPost(id) {
    const index = this._photoPosts.findIndex(post => post.id === id);
    if (index !== -1) {
      this._photoPosts.splice(index, 1);
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
        if (field !== 'id' && field !== 'author' && field !== 'createdAt' && field !== 'likes') {
          postCopy[field] = edits[field];
        }
      });
      if (PostModel._validateChangeableFields(postCopy) === true) {
        this.removePhotoPost(id);
        this.addPhotoPost(postCopy);
        return true;
      }
      return false;
    }
    return false;
  }
}
PostModel._DEFAULT_FILTER_CONFIG = {
  dateFrom: new Date(-8640000000000000),
  dateTo: new Date(8640000000000000),
  authorName: '',
  hashtags: [],
};

class View {
  constructor(hashtags) {
    this._hashtags = hashtags;
    this._hashtagTemplate = document.querySelector('.hashtag-template');
    this._postTemplate = document.querySelector('.post-template');
    this._main = document.querySelector('.main');
  }

  showHashtags() {
    this._variants = document.querySelector('.filter__variants');
    this._hashtags
      .map(this.buildHashtag.bind(this))
      .forEach(post => this._variants.appendChild(post));
  }

  _buildHashtag(hashtag) {
    const fragment = document.importNode(this._hashtagTemplate.content, true);
    fragment.querySelector('.filter__variant').textContent = `#${hashtag}`;
    return fragment;
  }

  showPosts(posts) {
    while (this._main.hasChildNodes() === true) {
      this._main.removeChild(this._main.firstChild);
    }
    this._main.appendChild(this._postTemplate);
    posts.map(this._buildPost.bind(this)).forEach(post => this._main.appendChild(post));
  }

  _buildPost(post) {
    const fragment = document.importNode(this._postTemplate.content, true);
    fragment.querySelector('.post-container__photo').setAttribute('src', post.photoLink);
    fragment.querySelector('.post-container__name').textContent = `${post.createdAt.toLocaleString()}, ${post.author}`;
    fragment.querySelector('.post-container__hashtag').textContent = post.hashtags.join(', ');
    fragment.querySelector('.post-container__desc').textContent = post.description;
    return fragment;
  }

  addPost(post) {
    this._posts.addPhotoPost(post);
    this.showPosts();
  }

  removePost(id) {
    this._posts.removePhotoPost(id);
    this.showPosts();
  }

  editPost(id, edits) {
    this._posts.editPhotoPost(id, edits);
    this.showPosts();
  }

  showElementsIfAuthorized(isAuthorized) {
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
      button1.onclick = 'location.href="addEditPost.html"';
      buttons.insertBefore(button1, button2);
      button2.innerHTML = 'Sign out';
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
        buttons.removeChild(buttons.querySelector('.header__button'));
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

const postsAPI = (function () {
  const posts = [
    {
      id: '1',
      description: 'Lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat1.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '2',
      description: 'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2019-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat2.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '3',
      description: 'Lorem3 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-20T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat3.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '4',
      description: 'Lorem4 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat4.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear', 'test'],
    },
    {
      id: '5',
      description: 'Lorem5 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-21T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat5.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '6',
      description: 'Lorem6 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat6.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '7',
      description: 'Lorem7 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat7.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '8',
      description: 'Lorem8 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat8.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear', 'test'],
    },
    {
      id: '9',
      description: 'Lorem9 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat9.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '10',
      description: 'Lorem10 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat10.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '11',
      description: 'Lorem11 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/swan11.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['swan', 'newyear'],
    },
    {
      id: '12',
      description: 'Lorem12 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/snowdrop12.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['snow', 'newyear'],
    },
    {
      id: '13',
      description: 'Lorem13 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat13.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '14',
      description: 'Lorem14 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/seagull14.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '15',
      description: 'Lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/highlander15.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '16',
      description: 'Lorem16 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/butterfly16.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '17',
      description: 'Lorem17 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/duck17.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '18',
      description: 'Lorem18 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/puffin18.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '19',
      description: 'Lorem19 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/bird19.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '20',
      description: 'Lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/dog20.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '21',
      description: 'Lorem21 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/chicken21.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '22',
      description: 'Lorem22 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/goat22.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '23',
      description: 'Lorem23 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/dog23.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '24',
      description: 'Lorem24 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/butterfly24.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '25',
      description: 'Lorem25 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/swan25.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
  ];
  const module = [];
  const model = new PostModel(posts);
  const view = new View();
  module.addPhotoPost = function (post) {
    if (model.addPhotoPost(post) === true) {
      view.showPosts(model.getPhotoPosts());
    }
  };
  module.removePhotoPost = function (id) {
    if (model.removePhotoPost(id) === true) {
      view.showPosts(model.getPhotoPosts());
    }
  };
  module.editPhotoPost = function (id, edits) {
    if (model.editPhotoPost(id, edits) === true) {
      view.showPosts(model.getPhotoPosts());
    }
  };
  module.showPhotoPosts = function () {
    view.showPosts(model.getPhotoPosts());
  };
  module.showElementsIfAuthorized = function (isAuthorized) {
    view.showElementsIfAuthorized(isAuthorized);
  };
  return module;
}());

postsAPI.showPhotoPosts();
postsAPI.showElementsIfAuthorized(false);
