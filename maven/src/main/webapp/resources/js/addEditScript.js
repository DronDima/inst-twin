class AddEditScript {
  constructor() {
    const AddEditFormfocusInput = document.querySelector('.add-post__tags');
    AddEditFormfocusInput.addEventListener('click', View.focusTagsInput);

    // TODO: Автоматическое добавление тега, если пользователь ввел имя в инпут, но не нажал энтер.
    const tagsInput = document.querySelector('.add-post__tags-input');
    tagsInput.addEventListener('keydown', MainController.keyDown);

    const form = document.querySelector('.add-post__form');
    form.addEventListener('submit', AddEditController.addPostToModel);

    AddEditScript.setDateAndTime();
  }

  static setDateAndTime() {
    const now = new Date();
    document.querySelector('#dateAndTime').value = now.toLocaleString();
    setTimeout(AddEditScript.setDateAndTime, 1000);
  }
}

const addEditScript = new AddEditScript();
