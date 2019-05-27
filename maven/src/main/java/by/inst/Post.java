package by.inst;

import java.util.ArrayList;
import java.util.Date;

public class Post implements Comparable<Post> {
    private Integer id;
    private String description;
    private Date createdAt;
    private Integer author;
    private String photoLink;
    private ArrayList<String> likes;
    private ArrayList<String> hashtags;

    public Post(Integer id, String description, Date createdAt, Integer author,
                String photoLink) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.hashtags = new ArrayList<>();
        this.likes = new ArrayList<>();
    }
    public Post(Integer id, String description, Date createdAt, Integer author,
                String photoLink, ArrayList<String> likes, ArrayList<String> tags) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.hashtags = tags;
        this.likes = likes;
    }

    public int compareTo(Post post) {
        return createdAt.compareTo(post.createdAt);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Integer getAuthor() {
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

    public void setLikes(ArrayList<String> likes) {
        this.likes = likes;
    }

    public ArrayList<String> getHashtags() {
        return hashtags;
    }

    public void setHashtags(ArrayList<String> hashtags) {
        this.hashtags.clear();
        this.hashtags.addAll(hashtags);
    }
}
