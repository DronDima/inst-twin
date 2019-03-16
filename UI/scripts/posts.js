class PostModel {
  constructor(posts) {
    this._defaultFilterConfig = {
      dateFrom: new Date(-8640000000000000),
      dateTo: new Date(8640000000000000),
      authorName: '',
      hashtags: [],
    };
    this._photoPosts = posts;
  }

  _isUnique(post) {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id === post.id) {
        return false;
      }
    }
    return true;
  }

  _isIntersect(postTags, configTags) {
    for (let i = 0; i < postTags.length; i += 1) {
      for (let j = 0; j < configTags.length; j += 1) {
        if (postTags[i] === configTags[j]) {
          return true;
        }
      }
    }
    return false;
  }

  addAll(posts) {
    const notValid = [];
    for (let i = 0; i < posts.length; i += 1) {
      if (this._validatePhotoPost(posts[i]) === true) {
        this._photoPosts.push(posts[i]);
        console.log(`Post with id ${posts[i].id} added.`);
      } else {
        notValid.push(posts[i]);
      }
    }
    console.log('Not valid posts:');
    console.log(notValid);
    return notValid;
  }

  getPhotoPosts(skip = 0, count = 10, filterConfig = this._defaultFilterConfig) {
    const filtratedPosts = this._photoPosts.filter(
      post => post.createdAt.getTime() >= filterConfig.dateFrom.getTime()
        && post.createdAt.getTime() <= filterConfig.dateTo.getTime()
        && (post.author === filterConfig.authorName
          || filterConfig.authorName === '')
        && (this._isIntersect(post.hashtags, filterConfig.hashtags)
          || filterConfig.hashtags.length === 0),
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const result = [];
    let number = 0;
    for (let i = skip; number < count && i < filtratedPosts.length; i += 1) {
      result.push(filtratedPosts[i]);
      number += 1;
    }
    console.log(`skip: ${skip}; count: ${count}; filterConfig:`);
    console.log(filterConfig);
    console.log('Result:');
    console.log(result);
    return result;
  }

  getPhotoPost(id) {
    let result;
    this._photoPosts.forEach((item) => {
      if (item.id === id) {
        result = item;
      }
    });
    if (result !== undefined) {
      console.log(`Post with id ${id} was found:`);
      console.log(result);
      return result;
    }
    console.log(`Post with id ${id} not found.`);
    return result;
  }

  _validatePhotoPost(post) {
    if (!Object.prototype.hasOwnProperty.call(post, 'id') || typeof post.id !== 'string' || !this._isUnique(post)
      || !Object.prototype.hasOwnProperty.call(post, 'description') || post.description.length >= 200 || typeof post.description !== 'string'
      || !Object.prototype.hasOwnProperty.call(post, 'createdAt')
      || !Object.prototype.hasOwnProperty.call(post, 'author') || typeof post.author !== 'string' || post.author === ''
      || !Object.prototype.hasOwnProperty.call(post, 'photoLink') || typeof post.photoLink !== 'string' || post.photoLink === ''
      || !Object.prototype.hasOwnProperty.call(post, 'hashtags')
      || !Object.prototype.hasOwnProperty.call(post, 'likes')) {
      console.log(`Post with id ${post.id} not valid.`);
      return false;
    }
    console.log(`Post with id ${post.id} valid.`);
    return true;
  }

  addPhotoPost(post) {
    if (this._validatePhotoPost(post) === true) {
      this._photoPosts.push(post);
      console.log(`Post with id ${post.id} added.`);
      return true;
    }
    console.log(`Post with id ${post.id} not added.`);
    return false;
  }

  removePhotoPost(id) {
    let index = -1;
    this._photoPosts.forEach((item, i) => {
      if (item.id === id) {
        index = i;
      }
    });
    if (index !== -1) {
      this._photoPosts.splice(index, 1);
      console.log(`Post with id ${id} deleted.`);
      return true;
    }
    console.log(`Post with id ${id} not found.`);
    return false;
  }

  editPhotoPost(id, edits) {
    const post = this.getPhotoPost(id);
    if (post !== undefined) {
      const postCopy = Object.assign(post);
      const fields = Object.keys(edits);
      for (let i = 0; i < fields.length; i += 1) {
        if (fields[i] !== 'id' && fields[i] !== 'author' && fields[i] !== 'createdAt' && fields[i] !== 'likes') {
          postCopy[fields[i]] = edits[fields[i]];
        }
      }
      this.removePhotoPost(id);
      if (this._validatePhotoPost(postCopy) === true) {
        this.addPhotoPost(postCopy);
        console.log('Post successfully changed.');
        return true;
      }
      this.addPhotoPost(post);
      console.log('Post not changed.');
      return false;
    }
    console.log('Post not changed.');
    return false;
  }
}

const validPost = {
  id: '29',
  description: 'Lorem29 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'dronchenko',
  photoLink: 'img/cat29',
  likes: ['dronchenko'],
  hashtags: ['newyear'],
};
const notValidPost = {
  id: '2',
  description: 'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'dronchenko',
  photoLink: 'img/cat22',
  likes: ['dronchenko'],
  hashtags: ['newyear'],
};
const configDate = {
  dateFrom: new Date('2018-02-19T23:00:00'),
  dateTo: new Date('2018-02-22T23:00:00'),
  authorName: '',
  hashtags: [],
};
const configAuthor = {
  dateFrom: new Date(-8640000000000000),
  dateTo: new Date(8640000000000000),
  authorName: 'dronchenko',
  hashtags: [],
};
const configAuthorHashtags = {
  dateFrom: new Date(-8640000000000000),
  dateTo: new Date(8640000000000000),
  authorName: 'dronchenko',
  hashtags: ['test'],
};
const validPostEdit = {
  description: 'changed2 ipsum dolor sit amet,ectetur adipiscictetur adipiscing elit. Aliquam at po',
  photoLink: 'img/cat2',
  hashtags: ['changedHashtag'],
};
const notValidEditDesc = {
  description: 'changed2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.onsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at po',
  photoLink: 'img/cat2',
};

const allAdd = [
  {
    id: '41',
    description: 'Lorem41 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat41',
    likes: ['dronchenko'],
    hashtags: ['newyear'],
  },
  {
    id: '42',
    description: 'Lorem42 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat42',
    likes: ['dronchenko'],
    hashtags: ['newyear'],
  },
  {
    id: '4',
    description: 'Lorem4 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat4',
    likes: ['dronchenko'],
    hashtags: ['newyear'],
  },
];

const posts = [
  {
    id: '1',
    description: 'Lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat1',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '2',
    description: 'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat1',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '3',
    description: 'Lorem3 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat3',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '4',
    description: 'Lorem4 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat4',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear', 'test'],
  },
  {
    id: '5',
    description: 'Lorem5 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-21T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat5',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '6',
    description: 'Lorem6 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat6',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '7',
    description: 'Lorem7 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat7',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '8',
    description: 'Lorem8 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'dronchenko',
    photoLink: 'img/cat8',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear', 'test'],
  },
  {
    id: '9',
    description: 'Lorem9 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat9',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '10',
    description: 'Lorem10 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat10',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '11',
    description: 'Lorem11 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/swan11',
    likes: ['dronchenko', 'katya'],
    hashtags: ['swan', 'newyear'],
  },
  {
    id: '12',
    description: 'Lorem12 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/snowdrop12',
    likes: ['dronchenko', 'katya'],
    hashtags: ['snow', 'newyear'],
  },
  {
    id: '13',
    description: 'Lorem13 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/cat13',
    likes: ['dronchenko', 'katya'],
    hashtags: ['cat', 'newyear'],
  },
  {
    id: '14',
    description: 'Lorem14 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/seagull14',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '15',
    description: 'Lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/highlander15',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '16',
    description: 'Lorem16 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/butterfly16',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '17',
    description: 'Lorem17 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/duck17',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '18',
    description: 'Lorem18 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/puffin18',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '19',
    description: 'Lorem19 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/bird19',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '20',
    description: 'Lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/dog20',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '21',
    description: 'Lorem21 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/chicken21',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '22',
    description: 'Lorem22 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/goat22',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '23',
    description: 'Lorem23 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/dog23',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '24',
    description: 'Lorem24 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/butterfly24',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
  {
    id: '25',
    description: 'Lorem25 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'img/swan25',
    likes: ['dronchenko', 'katya'],
    hashtags: ['annimal', 'newyear'],
  },
];

function test() {
  const model = new PostModel(posts);
  console.log('////////Add and validation////////');
  model.addPhotoPost(validPost);
  model.addPhotoPost(notValidPost);
  console.log('////////Removing////////');
  model.removePhotoPost('29');
  model.removePhotoPost('30');
  console.log('////////Get post////////');
  model.getPhotoPost('2');
  model.getPhotoPost('30');
  console.log('////////Get posts////////');
  model.getPhotoPosts();
  model.getPhotoPosts(0, 5);
  model.getPhotoPosts(4, 5);
  model.getPhotoPosts(1, 7, configDate);
  model.getPhotoPosts(1, 7, configAuthor);
  model.getPhotoPosts(1, 7, configAuthorHashtags);
  console.log('////////Edit post////////');
  model.editPhotoPost('2', validPostEdit);
  model.editPhotoPost('2', notValidEditDesc);
  console.log('////////Add all////////');
  model.addAll(allAdd);
}

test();
