class AddEditController {

  static addPostToModel() {
    const post = {};
    post.author = document.querySelector('#addEdit-author').value;
    const dateTimeStr = document.querySelector('#dateAndTime').value;
    post.createdAt = new Date(dateTimeStr);
    const nodeTags = document.querySelectorAll('.add-post__tag');
    post.hashtags = [].map.call(nodeTags, item => item.innerHTML);
    post.description = document.querySelector('#desc').value;
    let parts = document.querySelector('#uploadBtn').value.split("\\");
    post.photoLink = 'resources/img/' + parts[parts.length-1];
    post.likes = [];
    // FIXME: ID нужно не так генерировать.
    post.id = (mainController.getPostsCount() + 1).toString();

    mainController.addPhotoPost(post);
  }

  static editPostInModel(id) {
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
    mainController.editPhotoPost(id, edits);
  }
}
