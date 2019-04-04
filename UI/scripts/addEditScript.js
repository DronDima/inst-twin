function toggleVariants() {
  setTimeout(() => {
    document.querySelector('.add-post__variants').classList.toggle('add-post__variants_hidden');
  }, 100);
}

function focusAddEditFormTagsInput() {
  document.querySelector('.add-post__tags-input').focus();
}

function createTag(stringTag) {
  const tag = document.createElement('span');
  tag.classList.add('add-post__tag');
  tag.classList.add('hashtag');
  tag.innerHTML = stringTag;
  return tag;
}

function keyDown(event) {
  if (event.code === 'Enter' && this.value !== '') {
    this.parentNode.insertBefore(createTag(this.value), this);
    this.value = '';
    event.preventDefault();
  } else if (event.code === 'Backspace' && this.value === '') {
    this.previousSibling.remove();
  }
}

function setDateAndTime() {
  const now = new Date();

  document.querySelector('#dateAndTime').value = now.toLocaleString();
  setTimeout('setDateAndTime()', 1000);
}

const AddEditFormfocusInput = document.querySelector('.add-post__tags');
AddEditFormfocusInput.addEventListener('click', focusAddEditFormTagsInput);

const tagsInput = document.querySelector('.add-post__tags-input');
// TODO: Автоматическое добавление тега, если пользователь ввел имя в инпут, но не нажал энтер.
tagsInput.addEventListener('keydown', keyDown);
tagsInput.addEventListener('blur', toggleVariants);
tagsInput.addEventListener('focus', toggleVariants);

setDateAndTime();
