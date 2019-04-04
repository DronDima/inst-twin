function toggleVariants() {
  setTimeout(() => {
    document.querySelector('.filter__variants').classList.toggle('filter__variants_hidden');
  }, 100);
}

function keyDown(event) {
  if (event.code === 'Enter' && this.value !== '') {
    const span = document.createElement('span');
    span.classList.add('filter__tag');
    span.classList.add('hashtag');
    span.innerHTML = this.value;
    this.parentNode.insertBefore(span, this);
    this.value = '';
  } else if (event.code === 'Backspace' && this.value === '') {
    this.previousSibling.remove();
  }
}

function toggleBlur() {
  document.querySelector('.wrapper').classList.toggle('wrapper_blured');
}

function showFilter(event) {
  event.currentTarget.parentNode.querySelector('.filter__form').classList.toggle('filter__form_hidden');
  const symbol = event.currentTarget.querySelector('.filter__symbol').firstElementChild;
  if (!symbol.classList.replace('fa-angle-down', 'fa-angle-up')) {
    symbol.classList.replace('fa-angle-up', 'fa-angle-down');
  }
}

function resizePost(event) {
  if (document.documentElement.clientWidth > 610) {
    let { target } = event;
    while (target !== this) {
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

function focusFilterInput() {
  this.firstElementChild.focus();
}


function toggleAddEditForm() {
  document.querySelector('main').classList.toggle('hidden');
  document.querySelector('.filter-container').classList.toggle('filter-container_hidden');
  document.querySelector('.add-post-container').classList.toggle('add-post-container_hidden');
}


function editPostInModel(id) {
  const edits = {};
  const nodeTags = document.querySelectorAll('.add-post__tag');
  edits.hashtags = [].map.call(nodeTags, item => item.innerHTML);
  edits.description = document.querySelector('#desc').value;
  const link = document.querySelector('#uploadBtn');
  if (link.value !== '') {
    edits.photoLink = link.value;
  } else {
    edits.photoLink = link.defaultValue;
  }
  postsAPI.editPhotoPost(id, edits);
  toggleAddEditForm();
}

function fillFieldsInAddEditForm() {
  const edits = JSON.parse(localStorage.getItem('edits'));
  localStorage.removeItem('edits');
  if (edits != null) {
    document.querySelector('.add-post__title').textContent = 'Edit Post';
    const tagsField = document.querySelector('.add-post__tags');
    const tagsInput = document.querySelector('.add-post__tags-input');
    edits.hashtags.forEach(tag => tagsField.insertBefore(createTag(tag), tagsInput));
    document.querySelector('#uploadBtn').setAttribute('value', edits.photoLink);
    document.querySelector('.add-post__desc-input').value = edits.description;
    document.querySelector('.add-post__add-button').textContent = 'Confirm';
    const form = document.querySelector('.add-post__form');
    form.removeEventListener('submit', addPostToModel);
    form.addEventListener('submit', editPostInModel.bind(null, edits.id));
  }
}

function editPost(event) {
  let { target } = event;
  while (target !== this) {
    // TODO: Переделать под SPA и добавить класс.
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
      // FIXME: Убрать запись в локалсторэйдж.
      localStorage.setItem('edits', JSON.stringify(postInfo));
      toggleAddEditForm();
      fillFieldsInAddEditForm();
      return;
    }
    target = target.parentNode;
  }
}

const main = document.querySelector('.main');
main.addEventListener('click', resizePost);
main.addEventListener('click', editPost);


const filterTitle = document.querySelector('.filter__title');
filterTitle.addEventListener('click', showFilter);

const focusInput = document.querySelector('.filter__tags');
focusInput.addEventListener('click', focusFilterInput);

const filterInput = document.querySelector('.filter__tags-input');
filterInput.addEventListener('keydown', keyDown);
filterInput.addEventListener('blur', toggleVariants);
filterInput.addEventListener('focus', toggleVariants);

//FIXME: Переход в addpost из editpost.