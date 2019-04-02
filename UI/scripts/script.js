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

function editPost(event) {
  let { target } = event;
  while (target !== this) {
    // TODO: Переделать под SPA и добавить класс.
    if (target.textContent === 'edit') {
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
      localStorage.setItem('edits', JSON.stringify(postInfo));
      window.location.href = 'addEditPost.html';
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
