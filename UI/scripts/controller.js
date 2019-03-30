const postsAPI = (function postsAPI() {
  const posts = [
    {
      id: '1',
      description: 'Lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-01T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat1.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '2',
      description: 'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2019-02-02T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat2.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '3',
      description: 'Lorem3 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-03T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat3.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '4',
      description: 'Lorem4 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-04T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat4.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear', 'test'],
    },
    {
      id: '5',
      description: 'Lorem5 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-05T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat5.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '6',
      description: 'Lorem6 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-06T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat6.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '7',
      description: 'Lorem7 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-07T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat7.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '8',
      description: 'Lorem8 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-08T23:00:00'),
      author: 'dronchenko',
      photoLink: 'img/cat8.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear', 'test'],
    },
    {
      id: '9',
      description: 'Lorem9 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-09T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat9.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '10',
      description: 'Lorem10 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-15T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat10.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '11',
      description: 'Lorem11 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-16T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/swan11.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['swan', 'newyear'],
    },
    {
      id: '12',
      description: 'Lorem12 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-17T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/snowdrop12.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['snow', 'newyear'],
    },
    {
      id: '13',
      description: 'Lorem13 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-18T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/cat13.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['cat', 'newyear'],
    },
    {
      id: '14',
      description: 'Lorem14 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-19T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/seagull14.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '15',
      description: 'Lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-20T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/highlander15.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '16',
      description: 'Lorem16 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-21T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/butterfly16.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '17',
      description: 'Lorem17 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-22T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/duck17.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '18',
      description: 'Lorem18 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/puffin18.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '19',
      description: 'Lorem19 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-24T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/bird19.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '20',
      description: 'Lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-25T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/dog20.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '21',
      description: 'Lorem21 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-10T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/chicken21.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '22',
      description: 'Lorem22 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-11T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/goat22.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '23',
      description: 'Lorem23 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-12T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/dog23.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '24',
      description: 'Lorem24 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-13T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/butterfly24.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
    {
      id: '25',
      description: 'Lorem25 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
      createdAt: new Date('2018-02-14T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'img/swan25.jpg',
      likes: ['dronchenko', 'katya'],
      hashtags: ['annimal', 'newyear'],
    },
  ];
  const module = [];
  const model = new PostModel(posts);
  const view = new View();
  module.addPhotoPost = function addPhotoPost(post) {
    if (model.addPhotoPost(post) === true) {
      view.addPost(post, model.getPhotoPost(post.id).index);
    }
  };
  module.getPostsCount = function getPostsCount() {
    return model.getPostsCount();
  };
  module.clearPosts = function clearPosts() {
    view.clearPosts();
  };
  module.removePhotoPost = function removePhotoPost(id) {
    const index = model.removePhotoPost(id);
    if (index !== -1) {
      view.removePost(index);
    }
  };
  module.editPhotoPost = function editPhotoPost(id, edits) {
    if (model.editPhotoPost(id, edits) === true) {
      view.editPost(model.getPhotoPost(id));
    }
  };
  module.showHashtags = function showHashtags(hashtags) {
    view.showHashtags(hashtags);
  };
  module.showPhotoPosts = function showPhotoPosts(skip = 0, count = 10, config) {
    view.showPosts(model.getPhotoPosts(skip, count, config), model.getPostsCount(config));
  };
  module.showElementsIfAuthorized = function showElementsIfAuthorized(isAuthorized) {
    View.showElementsIfAuthorized(isAuthorized);
  };
  return module;
}());

function createFilter() {
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
    if (timeTo !== '') {
      time = timeFrom.split(':');
      from.setUTCHours(time[0]);
      from.setUTCMinutes(time[1]);
    }
  }

  if (dateTo !== '') {
    to = new Date(dateTo);
    if (timeFrom !== '') {
      time = timeTo.split(':');
      to.setUTCHours(time[0]);
      to.setUTCMinutes(time[1]);
    }
  }

  const nodeTags = inputs.querySelectorAll('.filter__tag');
  const tags = [].map.call(nodeTags, item => item.innerHTML);

  config.dateFrom = from;
  config.dateTo = to;
  config.authorName = inputs.querySelector('#author').value;
  config.hashtags = tags;
  return config;
}

function applyFilter() {
  // TODO: Автообновление постов после ввода полей.
  postsAPI.clearPosts();
  postsAPI.showPhotoPosts(0, 10, createFilter());
}

function loadMore() {
  const currentPostCount = document.querySelectorAll('.post-container').length;
  postsAPI.showPhotoPosts(currentPostCount, 10, createFilter());
}

const filterForm = document.querySelector('.filter__form');
filterForm.addEventListener('submit', applyFilter);

const mainButton = document.querySelector('.main__button');
mainButton.addEventListener('click', loadMore);

postsAPI.showPhotoPosts();
postsAPI.showElementsIfAuthorized(false);
