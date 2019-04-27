package by.inst;

import java.util.ArrayList;

public class Post {
    private Integer id;
    private String description;
    private String createdAt;
    private String author;
    private String photoLink;
    private ArrayList<String> likes;
    private ArrayList<String> hashtags;

    public Post(Integer id, String description, String createdAt, String author,
                String photoLink, ArrayList<String> likes, ArrayList<String> tags) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.likes = likes;
        this.hashtags = tags;
    }

    public Integer getId() {
        return new Integer(id);
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public ArrayList<String> getLikes() {
        return likes;
    }

    public ArrayList<String> getHashtags() {
        return hashtags;
    }

    public void setHashtags(ArrayList<String> hashtags) {
        this.hashtags = hashtags;
    }
}
