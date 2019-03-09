var addValid = {
    id: "29",
    description: "Lorem29 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
    createdAt: new Date("2018-02-23T23:00:00"),
    author: "dronchenko",
    photoLink: 'img/cat29',
    likes: ["dronchenko"],
    hashtags: ["newyear"],
};
var addUnValidId = {
    id: "2",
    description: "Lorem2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.",
    createdAt: new Date("2018-02-23T23:00:00"),
    author: "dronchenko",
    photoLink: 'img/cat22',
    likes: ["dronchenko"],
    hashtags: ["newyear"],
};
var configDate = {
    dateFrom: new Date("2018-02-19T23:00:00"),
    dateTo: new Date("2018-02-22T23:00:00"),
    authorName: "",
    hashtags: [],
};
var configAuthor = {
    dateFrom: new Date(-8640000000000000),
    dateTo: new Date(8640000000000000),
    authorName: "dronchenko",
    hashtags: [],
};
var configAuthorHashtags = {
    dateFrom: new Date(-8640000000000000),
    dateTo: new Date(8640000000000000),
    authorName: "dronchenko",
    hashtags: ["test"],
};
var editValid = {
    description: "changed2 ipsum dolor sit amet,ectetur adipiscictetur adipiscing elit. Aliquam at po",
    photoLink: 'img/cat2',
    hashtags: ["changedHashtag"],
};
var editUnValidDesc = {
    description: "changed2 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat.onsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at poonsectetur adipiscing elit. Aliquam at po",
    photoLink: 'img/cat2',
};

function test() {
    console.log("////////Add and validation////////");
    posts.addPhotoPost(addValid);
    posts.addPhotoPost(addUnValidId);
    console.log("////////Removing////////");
    posts.removePhotoPost("29");
    posts.removePhotoPost("30");
    console.log("////////Get post////////");
    posts.getPhotoPost("2");
    posts.getPhotoPost("30");
    console.log("////////Get posts////////");
    posts.getPhotoPosts();
    posts.getPhotoPosts(0,5);
    posts.getPhotoPosts(4,5);
    posts.getPhotoPosts(1,7,configDate);
    posts.getPhotoPosts(1,7,configAuthor);
    posts.getPhotoPosts(1,7,configAuthorHashtags);
    console.log("////////Edit post////////");
    posts.editPhotoPost("2",editValid);
    posts.editPhotoPost("2",editUnValidDesc);
}