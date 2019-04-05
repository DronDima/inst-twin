class MainScript {
  constructor() {
    const headerButtons = document.querySelectorAll('.header__button');
    headerButtons[0].addEventListener('click', MainController.pressAddPostButton);
    headerButtons[1].addEventListener('click', View.showSignupDialog);
    headerButtons[2].addEventListener('click', MainController.signOut.bind(null, mainController));

    const signInForm = document.querySelector('.signin-dialog__form');
    signInForm.addEventListener('submit', MainController.signIn.bind(null, mainController));
    const signInButtons = document.querySelectorAll('.signin-dialog__button');
    signInButtons[1].addEventListener('click', MainController.closeDialogWindow);

    const filterForm = document.querySelector('.filter__form');
    filterForm.addEventListener('submit', MainScript.applyFilter);

    const loadMoreButton = document.querySelector('.main__button');
    loadMoreButton.addEventListener('click', MainController.loadMore.bind(null, mainController));

    const main = document.querySelector('.main');
    main.addEventListener('click', MainController.openDeleteDialog);
    main.addEventListener('click', View.resizePost);
    main.addEventListener('click', MainController.editPost);

    const filterInput = document.querySelector('.filter__tags-input');
    // TODO: Сделать возможность удалять по нажатию на крестик.
    filterInput.addEventListener('keydown', MainController.keyDown);
    filterInput.addEventListener('blur', View.toggleVariants);
    filterInput.addEventListener('focus', View.toggleVariants);

    const focusInput = document.querySelector('.filter__tags');
    focusInput.addEventListener('click', View.focusTagsInput);

    const filterTitle = document.querySelector('.filter__title');
    filterTitle.addEventListener('click', View.showFilter);
  }

  static applyFilter(event) {
    mainController.applyFilter(event);
    // TODO: Автообновление постов после ввода полей.
  }
}

const mainScript = new MainScript();

// FIXME: Переход в addpost из editpost.
