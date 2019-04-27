class MainController {
  constructor() {
    const mainDOM = document.querySelector('.main');
    this._model = new PostService();
    this._view = new View(mainDOM);
  }

  async addPhotoPost(post) {
    // TODO: Оповещение о том, что пост добавлен или нет.
    await this._model.addPhotoPost(post);
  }

  clearPosts() {
    this._view.clearPosts();
  }

  async removePhotoPost(id) {
    await this._model.removePhotoPost(id).then((result) => {
      if (JSON.parse(result) === true) {
        this._view.clearPost(id);
      }
    });
  }

  async editPhotoPost(id, edits) {
    await this._model.editPhotoPost(id, edits);
    View.toggleAddEditForm();
  }

  showHashtags(hashtags) {
    this._view.showHashtags(hashtags);
  }

  async showPhotoPosts(skip = 0, count = 10, config) {
    let posts;
    await this._model.getPhotoPosts(skip, count, config).then(data => posts = data);
    this._view
      .showPosts(posts, posts.length);
    this.showElementsIfAuthorized();
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
