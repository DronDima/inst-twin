class MainController {
  constructor() {
    const posts = [
      {
        id: '1',
        description: 'Lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-01T23:00:00'),
        author: 'dronchenko',
        photoLink: 'img/cat1.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '2',
        description: 'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2019-02-02T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat2.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '3',
        description: 'Lorem3 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-03T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat3.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '4',
        description: 'Lorem4 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-04T23:00:00'),
        author: 'dronchenko',
        photoLink: 'img/cat4.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear', 'test'],
      },
      {
        id: '5',
        description: 'Lorem5 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-05T23:00:00'),
        author: 'dronchenko',
        photoLink: 'img/cat5.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '6',
        description: 'Lorem6 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-06T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat6.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '7',
        description: 'Lorem7 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-07T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat7.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '8',
        description: 'Lorem8 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-08T23:00:00'),
        author: 'dronchenko',
        photoLink: 'img/cat8.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear', 'test'],
      },
      {
        id: '9',
        description: 'Lorem9 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-09T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat9.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '10',
        description: 'Lorem10 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-15T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat10.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '11',
        description: 'Lorem11 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-16T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/swan11.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['swan', 'newyear'],
      },
      {
        id: '12',
        description: 'Lorem12 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/snowdrop12.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['snow', 'newyear'],
      },
      {
        id: '13',
        description: 'Lorem13 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-18T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/cat13.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['cat', 'newyear'],
      },
      {
        id: '14',
        description: 'Lorem14 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-19T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/seagull14.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '15',
        description: 'Lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-20T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/highlander15.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '16',
        description: 'Lorem16 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-21T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/butterfly16.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '17',
        description: 'Lorem17 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-22T23:00:00'),
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
        createdAt: new Date('2018-02-24T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/bird19.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '20',
        description: 'Lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-25T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/dog20.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '21',
        description: 'Lorem21 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-10T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/chicken21.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '22',
        description: 'Lorem22 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-11T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/goat22.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '23',
        description: 'Lorem23 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-12T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/dog23.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '24',
        description: 'Lorem24 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-13T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/butterfly24.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
      {
        id: '25',
        description: 'Lorem25 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
        createdAt: new Date('2018-02-14T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'img/swan25.jpg',
        likes: ['dronchenko', 'katya'],
        hashtags: ['annimal', 'newyear'],
      },
    ];
    const mainDOM = document.querySelector('.main');
    this._model = new PostModel(posts);
    this._view = new View(mainDOM);
  }

  addPhotoPost(post) {
    // TODO: Оповещение о том, что пост добавлен или нет.
    this._model.addPhotoPost(post);
  }

  getPostsCount() {
    return this._model.getPostsCount();
  }

  clearPosts() {
    this._view.clearPosts();
  }

  removePhotoPost(id) {
    this._model.removePhotoPost(id);
    this._view.clearPost(id);
    View.closeDialogWindow('delete-dialog');
  }

  editPhotoPost(id, edits) {
    if (this._model.editPhotoPost(id, edits) === true) {
      View.toggleAddEditForm();
    }
  }

  showHashtags(hashtags) {
    this._view.showHashtags(hashtags);
  }

  showPhotoPosts(skip = 0, count = 10, config) {
    this._view
      .showPosts(this._model.getPhotoPosts(skip, count, config), this._model.getPostsCount(config));
  }

  showElementsIfAuthorized() {
    View.showElementsIfAuthorized(this._model.isAuthorized());
  }

  toggleAuthStatus() {
    this._model.toggleAuthStatus();
  }

  static signOut(mainController) {
    mainController.toggleAuthStatus();
    mainController.showElementsIfAuthorized();
    if (!document.querySelector('.add-post-container').classList.contains('add-post-container_hidden')) {
      View.toggleAddEditForm();
    }
  }

  static signIn(mainController) {
    mainController.toggleAuthStatus();
    mainController.showElementsIfAuthorized();
    View.toggleBlur();
  }

  static closeDialogWindow(event) {
    const targetClasses = event.target.classList;
    if (targetClasses.contains('button_cancel')) {
      if (targetClasses.contains('signin-dialog__button')) {
        View.closeDialogWindow('signin-dialog');
      } else if (targetClasses.contains('delete-dialog__button')) {
        View.closeDialogWindow('delete-dialog');
      }
    }
  }

  static pressAddPostButton() {
    if (document.querySelector('.add-post-container').classList.contains('add-post-container_hidden')) {
      View.toggleAddEditForm();
    } else {
      window.location = '';
    }
  }

  static createFilter() {
    const config = {};
    const inputs = document.querySelector('.filter__inputs');

    const dateFrom = inputs.querySelector('#date-from').value;
    const timeFrom = inputs.querySelector('#time-from').value;
    const dateTo = inputs.querySelector('#date-to').value;
    const timeTo = inputs.querySelector('#time-to').value;

    let time;
    let from = new Date(-8640000000000000);
    let to = new Date(8640000000000000);
    if (dateFrom !== '') {
      from = new Date(dateFrom);
      if (timeTo !== '') {
        time = timeFrom.split(':');
        from.setUTCHours(time[0]);
        from.setUTCMinutes(time[1]);
      }
    }

    if (dateTo !== '') {
      to = new Date(dateTo);
      if (timeFrom !== '') {
        time = timeTo.split(':');
        to.setUTCHours(time[0]);
        to.setUTCMinutes(time[1]);
      }
    }

    const nodeTags = inputs.querySelectorAll('.filter__tag');
    const tags = [].map.call(nodeTags, item => item.innerHTML);

    config.dateFrom = from;
    config.dateTo = to;
    config.authorName = inputs.querySelector('#author').value;
    config.hashtags = tags;
    return config;
  }

  applyFilter(event) {
    // TODO: Автообновление постов после ввода полей.
    this.clearPosts();
    this.showPhotoPosts(0, 10, MainController.createFilter());
    this.showElementsIfAuthorized();
    event.preventDefault();
  }

  static loadMore(mainController) {
    const currentPostCount = document.querySelectorAll('.post-container').length;
    mainController.showPhotoPosts(currentPostCount, 10, MainController.createFilter());
    mainController.showElementsIfAuthorized();
  }

  static openDeleteDialog(event) {
    let { target } = event;
    while (target !== event.currentTarget) {
      if (target.classList.contains('post-container__delete')) {
        const deleteDialog = document.getElementById('delete-dialog');
        if (typeof deleteDialog.showModal === 'function') {
          const dialogDelButton = document.querySelector('.delete-dialog__delete-button');
          dialogDelButton.addEventListener('click', MainController.deleteButton.bind(null, target));
          deleteDialog.showModal();
          View.toggleBlur();
        } else {
          alert('The dialog API is not supported by this browser');
        }
        return;
      }
      target = target.parentNode;
    }
  }

  static deleteButton(target) {
    mainController.removePhotoPost(MainController.getPostId(target));
  }

  static getPostId(target) {
    let post = target.parentNode;
    while (post !== this) {
      if (post.classList.contains('post-container')) {
        break;
      }
      post = post.parentNode;
    }
    return post.getAttribute('data-id');
  }

  static keyDown(event) {
    if (event.code === 'Enter' && this.value !== '') {
      this.parentNode.insertBefore(MainController.createTag(this), this);
      this.value = '';
      event.preventDefault();
    } else if (event.code === 'Backspace' && this.value === '') {
      this.previousSibling.remove();
    }
  }

  static createTag(tagsInput) {
    const tag = document.createElement('span');
    if (tagsInput.classList.contains('filter__tags-input')) {
      tag.classList.add('filter__tag');
    } else if (tagsInput.classList.contains('add-post__tags-input')) {
      tag.classList.add('add-post__tag');
    }
    tag.classList.add('hashtag');
    tag.innerHTML = tagsInput.value;
    return tag;
  }

  static fillFieldsInAddEditForm(edits) {
    document.querySelector('.add-post__title').textContent = 'Edit Post';
    const tagsField = document.querySelector('.add-post__tags');
    const tagsInput = document.querySelector('.add-post__tags-input');
    edits.hashtags.forEach((tagString) => {
      tagsInput.value = tagString;
      tagsField.insertBefore(MainController.createTag(tagsInput), tagsInput);
    });
    tagsInput.value = '';
    document.querySelector('#uploadBtn').setAttribute('value', edits.photoLink);
    document.querySelector('.add-post__desc-input').value = edits.description;
    document.querySelector('.add-post__add-button').textContent = 'Confirm';
    const form = document.querySelector('.add-post__form');
    form.removeEventListener('submit', AddEditController.addPostToModel);
    form.addEventListener('submit', AddEditController.editPostInModel.bind(null, edits.id));
  }

  static editPost(event) {
    let { target } = event;
    while (target !== this) {
      if (target.classList.contains('post-container__edit')) {
        let post = target;
        while (post !== this) {
          if (post.classList.contains('post-container')) {
            break;
          }
          post = post.parentNode;
        }
        const postInfo = {};
        postInfo.id = post.getAttribute('data-id');
        postInfo.description = post.querySelector('.post-container__desc').textContent;
        postInfo.photoLink = post.querySelector('.post-container__photo').getAttribute('src');
        const hashtagsString = post.querySelector('.post-container__hashtag').textContent;
        postInfo.hashtags = hashtagsString.split(', ');
        View.toggleAddEditForm();
        MainController.fillFieldsInAddEditForm(postInfo);
        return;
      }
      target = target.parentNode;
    }
  }

  toggleLike(event) {
    let { target } = event;
    while (target !== event.currentTarget) {
      if (target.classList.contains('post-container__like')) {
        View.toggleLike(event, target);
        this._model.toggleLike(MainController.getPostId(target), 'username');
        return;
      }
      target = target.parentNode;
    }
  }
}

const mainController = new MainController();
mainController.showPhotoPosts();
mainController.showElementsIfAuthorized();
