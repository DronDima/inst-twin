var posts = (function () {
    var module = {};
    var photoPosts = [
        {
            id: "1",
            description: "Lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "dronchenko",
            photoLink: 'img/cat1',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "2",
            description: "Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat1',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "3",
            description: "Lorem3 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-20T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat3',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "4",
            description: "Lorem4 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "dronchenko",
            photoLink: 'img/cat4',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear", "test"],
        },
        {
            id: "5",
            description: "Lorem5 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-21T23:00:00"),
            author: "dronchenko",
            photoLink: 'img/cat5',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "6",
            description: "Lorem6 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat6',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "7",
            description: "Lorem7 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat7',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "8",
            description: "Lorem8 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "dronchenko",
            photoLink: 'img/cat8',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear", "test"],
        },
        {
            id: "9",
            description: "Lorem9 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat9',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "10",
            description: "Lorem10 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat10',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "11",
            description: "Lorem11 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/swan11',
            likes: ["dronchenko", "katya"],
            hashtags: ["swan", "newyear"],
        },
        {
            id: "12",
            description: "Lorem12 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/snowdrop12',
            likes: ["dronchenko", "katya"],
            hashtags: ["snow", "newyear"],
        },
        {
            id: "13",
            description: "Lorem13 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/cat13',
            likes: ["dronchenko", "katya"],
            hashtags: ["cat", "newyear"],
        },
        {
            id: "14",
            description: "Lorem14 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/seagull14',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "15",
            description: "Lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/highlander15',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "16",
            description: "Lorem16 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/butterfly16',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "17",
            description: "Lorem17 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/duck17',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "18",
            description: "Lorem18 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/puffin18',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "19",
            description: "Lorem19 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/bird19',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "20",
            description: "Lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/dog20',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "21",
            description: "Lorem21 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/chicken21',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "22",
            description: "Lorem22 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/goat22',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "23",
            description: "Lorem23 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/dog23',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "24",
            description: "Lorem24 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/butterfly24',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
        {
            id: "25",
            description: "Lorem25 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Иванов Иван",
            photoLink: 'img/swan25',
            likes: ["dronchenko", "katya"],
            hashtags: ["annimal", "newyear"],
        },
    ];
    var defaultFilterConfig = {
        dateFrom: new Date(-8640000000000000),
        dateTo: new Date(8640000000000000),
        authorName: "",
        hashtags: [],
    };
    function isUnique(post) {
        for(var i = 0 ; i < photoPosts.length; i++) {
            if (photoPosts[i].id == post.id) {
                return false;
            }
        }
        return true;
    }
    function isIntersect(postTags, configTags) {
        for (var i = 0; i < postTags.length; i++) {
            for (var j = 0; j < configTags.length; j++) {
                if (postTags[i] == configTags[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    module.getPhotoPosts = function (skip = 0, count = 10, filterConfig = defaultFilterConfig) {
        var filtratedPosts = photoPosts.filter(post =>
            post.createdAt.valueOf() >= filterConfig.dateFrom.valueOf() &&
            post.createdAt.valueOf() <= filterConfig.dateTo.valueOf() &&
            (post.author == filterConfig.authorName || filterConfig.authorName == "") &&
            (isIntersect(post.hashtags, filterConfig.hashtags) || filterConfig.hashtags.length == 0)
            ).sort(function (a, b) {
            return b.createdAt.valueOf()- a.createdAt.valueOf();
        });
        var result = [];
        var number = 0;
        for(var i = skip; number < count && i < filtratedPosts.length; i++) {
            result.push(filtratedPosts[i]);
            number++;
        }
        console.log("skip: " + skip + "; count: " + count + "; filterConfig:");
        console.log(filterConfig);
        console.log("Result:");
        console.log(result);
        return result;
    };
    module.getPhotoPost = function (id) {
        var result;
        photoPosts.forEach(function (item) {
            if(item.id == id){
                console.log("Post with id " + id + " was found:");
                console.log(item);
                result = item;
            }
        });
        if (result != undefined) {
            return result;
        }
        console.log("Post with id " + id + " not found.");
    };
    module.validatePhotoPost = function (post) {
        if (!post.hasOwnProperty("id") || typeof post.id != "string" || !isUnique(post) ||
            !post.hasOwnProperty("description") || post.description.length >= 200 || typeof post.description != "string" ||
            !post.hasOwnProperty("createdAt") ||
            !post.hasOwnProperty("author") || typeof post.author != "string" || post.author == "" ||
            !post.hasOwnProperty("photoLink") || typeof post.photoLink != "string" || post.author == "" ||
            !post.hasOwnProperty("hashtags") ||
            !post.hasOwnProperty("likes")) {
            console.log("Post with id " + post.id + " not valid.");
            return false;
        }
        else {
            console.log("Post with id " + post.id + " valid.");
            return true;
        }
    };

    module.addPhotoPost = function (post) {
        if (module.validatePhotoPost(post) == true) {
            photoPosts.push(post);
            console.log("Post with id " + post.id + " added.");
            return true;
        }
        else {
            console.log("Post with id " + post.id + " not added.");
            return false;
        }
    };

    module.removePhotoPost = function (id) {
        var index = -1;
        photoPosts.forEach(function (item, i) {
            if (item.id == id) {
                index = i;
            }
        });
        if (index != -1) {
            photoPosts.splice(index, 1);
            console.log("Post with id " + id + " deleted.");
            return true;
        }
        else {
            console.log("Post with id " + id + " not found.");
            return false;
        }
    };

    module.editPhotoPost = function (id, edits) {
        var post = module.getPhotoPost(id);
        var savePost = Object.assign({}, post);
        for (var field in edits) {
            if (field != "id" && field != "author" && field != "createdAt" && field != "likes") {
                post[field] = edits[field];
            }
        }
        module.removePhotoPost(post.id);
        if (module.validatePhotoPost(post) == true) {
            module.addPhotoPost(post);
            console.log("Post successfully changed.");
            return true;
        }
        else {
            module.addPhotoPost(savePost);
            console.log("Post not changed.");
            return false;
        }
    };
    return module;
})();