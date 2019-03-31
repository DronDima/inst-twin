function toggleVariants() {
  setTimeout(() => {
    document.querySelector('.add-post__variants').classList.toggle('add-post__variants_hidden');
  }, 100);
}

function focusTagsInput() {
  document.querySelector('.add-post__tags-input').focus();
}


function keyDown(event) {
  if (event.code === 'Enter' && this.value !== '') {
    const span = document.createElement('span');
    span.classList.add('add-post__tag');
    span.classList.add('hashtag');
    span.innerHTML = this.value;
    this.parentNode.insertBefore(span, this);
    this.value = '';
    //TODO: Это норм?
    event.preventDefault();
  } else if (event.code === 'Backspace' && this.value === '') {
    this.previousSibling.remove();
  }
}

function func(event) {
  if (event.code === 'Enter' && this.value !== '') {
    this.focus();
  }
}

const focusInput = document.querySelector('.add-post__tags');
focusInput.addEventListener('click', focusTagsInput);

const tagsInput = document.querySelector('.add-post__tags-input');
tagsInput.addEventListener('keydown', keyDown);
tagsInput.addEventListener('blur', toggleVariants);
tagsInput.addEventListener('focus', toggleVariants);
