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

function openDeleteModal(event) {
  let { target } = event;
  while (target !== this) {
    if (target.classList.contains('post-container__link')) {
      toggleBlur();
      return;
    }
    target = target.parentNode;
  }
}

function signInButton() {
  window.location.href = '#signin-modal';
  toggleBlur();
}

function cancelButton() {
  window.location.href = '';
  toggleBlur();
}

function focusFilterInput() {
  this.firstElementChild.focus();
}

function applyFilter() {
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
    time = timeFrom.split(':');
    from.setUTCHours(time[0]);
    from.setUTCMinutes(time[1]);
  }

  if (dateTo !== '') {
    to = new Date(dateTo);
    time = timeTo.split(':');
    to.setUTCHours(time[0]);
    to.setUTCMinutes(time[1]);
  }

  const nodeTags = inputs.querySelectorAll('.filter__tag');
  const tags = [].map.call(nodeTags, item => item.innerHTML);

  config.dateFrom = from;
  config.dateTo = to;
  config.authorName = inputs.querySelector('#author').value;
  config.hashtags = tags;
  postsAPI.showPhotoPosts(0, 10, config);
}

const main = document.querySelector('.main');
main.addEventListener('click', resizePost);
main.addEventListener('click', openDeleteModal);

const headerButtons = document.querySelector('.header__buttons');
headerButtons.lastElementChild.addEventListener('click', signInButton);

const signInButtons = document.querySelectorAll('.signin-dialog__button');
signInButtons[1].addEventListener('click', cancelButton);

const filterApplyButton = document.querySelector('.filter__apply-button');
filterApplyButton.addEventListener('click', applyFilter);

const filterTitle = document.querySelector('.filter__title');
filterTitle.addEventListener('click', showFilter);

const focusInput = document.querySelector('.filter__tags');
focusInput.addEventListener('click', focusFilterInput);

const filterInput = document.querySelector('.filter__tags-input');
filterInput.addEventListener('keydown', keyDown);
filterInput.addEventListener('blur', toggleVariants);
filterInput.addEventListener('focus', toggleVariants);

const mainButton = document.querySelector('.main__button');
mainButton.addEventListener('click', applyFilter);

const deleteButtons = document.querySelector('.delete-dialog__buttons');
deleteButtons.lastElementChild.addEventListener('click', cancelButton);
