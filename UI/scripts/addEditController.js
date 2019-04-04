function signOutButton() {
  postsAPI.toggleAuthStatus();
  window.location.href = 'index.html';
}

function addPostButton() {
  window.location.href = 'addEditPost.html';
  postsAPI.showElementsIfAuthorized();
}

function addPostToModel() {
  const post = {};
  post.author = document.querySelector('#addEdit-author').value;
  const dateTimeStr = document.querySelector('#dateAndTime').value;
  post.createdAt = new Date(dateTimeStr);
  const nodeTags = document.querySelectorAll('.add-post__tag');
  post.hashtags = [].map.call(nodeTags, item => item.innerHTML);
  post.description = document.querySelector('#desc').value;
  post.photoLink = document.querySelector('#uploadBtn').value;
  post.likes = [];
  // FIXME: ID нужно не так генерировать.
  post.id = (postsAPI.getPostsCount() + 1).toString();

  postsAPI.addPhotoPost(post);
}

const form = document.querySelector('.add-post__form');
form.addEventListener('submit', addPostToModel);


postsAPI.showElementsIfAuthorized();
