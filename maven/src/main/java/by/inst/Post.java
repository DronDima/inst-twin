package by.inst;

import java.util.ArrayList;

public class Post {
    private String id;
    private String description;
    private String createdAt;
    private String author;
    private String photoLink;
    private ArrayList<String> likes;
    private ArrayList<String> tags;

    public Post(String id, String description, String createdAt, String author,
                String photoLink, ArrayList<String> likes, ArrayList<String> tags) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.likes = likes;
        this.tags = tags;
    }

    public String getId() {
        return id;
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

    public String getPhotoLink() {
        return photoLink;
    }

    public ArrayList<String> getLikes() {
        return likes;
    }

    public ArrayList<String> getTags() {
        return tags;
    }
}
