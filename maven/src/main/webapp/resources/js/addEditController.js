class AddEditController {

  static async addPostToModel(event) {
    event.preventDefault();
    const post = {};
    post.author = document.querySelector('#addEdit-author').value;
    const dateTimeStr = document.querySelector('#dateAndTime').value;
    post.createdAt = new Date(dateTimeStr);
    const nodeTags = document.querySelectorAll('.add-post__tag');
    post.hashtags = [].map.call(nodeTags, item => item.innerHTML);
    post.description = document.querySelector('#desc').value;
    const parts = document.querySelector('#uploadBtn').value.split('\\');
    post.photoLink = 'resources/img/' + parts[parts.length - 1];
    post.likes = [];

    await mainController.addPhotoPost(post);
  }

  static async editPostInModel(id, event) {
    event.preventDefault();
    const edits = {};
    const nodeTags = document.querySelectorAll('.add-post__tag');
    edits.hashtags = [].map.call(nodeTags, item => item.innerHTML);
    edits.description = document.querySelector('#desc').value;
    const link = document.querySelector('#uploadBtn');
    if (link.value !== '') {
      const parts = link.value.split('\\');
      edits.photoLink = 'resources/img/' + parts[parts.length - 1];
    } else {
      edits.photoLink = link.defaultValue;
    }
    await mainController.editPhotoPost(id, edits);
  }

  static loadImage(e) {
    const form = e.target.closest('form');
    const formData = new FormData(form);
    fetch('/upload', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        View.showError(response.statusText);
      } else {
        response.text().then(resp => alert(resp));
      }
    }).catch(err => View.showError(`Fetch Error: ${err}`));
  }
}
