package by.inst;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;

public class Posts {
    private ArrayList<Post> posts = new ArrayList<>();

    public Posts() {
        ArrayList<String> hashtags = new ArrayList<>(Arrays.asList("tag1", "tag2"));
        ArrayList<String> likes = new ArrayList<>(Arrays.asList("like1", "like2"));
        Post post1 = new Post(1, "desc1", "date1", "auth1", "resources/img/cat1.jpg",
                likes, hashtags);
        Post post2 = new Post(2, "desc2", "date2", "auth2", "resources/img/cat2.jpg",
                likes, hashtags);
        Post post3 = new Post(3, "desc3", "date3", "auth3", "resources/img/cat3.jpg",
                likes, hashtags);
        Post post4 = new Post(4, "desc4", "date4", "auth4", "resources/img/cat4.jpg",
                likes, hashtags);
        posts.add(post1);
        posts.add(post2);
        posts.add(post3);
        posts.add(post4);
    }

    public String getPosts() {
        Gson gson = new Gson();
        return gson.toJson(posts);
    }

    public boolean addPost(String JSONPost) {
        Gson gson = new Gson();
        Type type = new TypeToken<Post>(){}.getType();
        Post post = gson.fromJson(JSONPost, type);
        post.setId(this.getMaxId()+1);
        System.out.println(post.getId());
        posts.add(post);
        return true;
    }


    public Integer getMaxId() {
        Integer maxId = 0;
        for (int i = 0 ; i < posts.size(); i++) {
            if (posts.get(i).getId() > maxId) {
                maxId = posts.get(i).getId();
            }
        }
        return maxId;
    }

    public void editPost(String JSONEdits) {
        Gson gson = new Gson();
        Type type = new TypeToken<Post>(){}.getType();
        Post edits = gson.fromJson(JSONEdits, type);
        for (int i = 0; i < posts.size(); i++) {
            if (posts.get(i).getId().equals(edits.getId())) {
                posts.get(i).setDescription(edits.getDescription());
                posts.get(i).setHashtags(edits.getHashtags());
                posts.get(i).setPhotoLink(edits.getPhotoLink());
                return;
            }
        }
    }

    public String getPost(String id) {
        for (int i = 0; i < posts.size(); i++) {
            if (posts.get(i).getId().equals(id)) {
                Gson gson = new Gson();
                return gson.toJson(posts.get(i));
            }
        }
        return null;
    }

    public boolean deletePost(String id) {
        for (int i = 0; i < posts.size(); i++) {
            if (posts.get(i).getId().equals(id)) {
                posts.remove(i);
                return true;
            }
        }
        return false;
    }
}
