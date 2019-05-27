package by.inst;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.naming.NamingException;
import java.io.IOException;
import java.sql.*;

import java.lang.reflect.Type;
import java.sql.Date;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;


public class Posts implements DBService {

//    private static Predicate<Post> predicate(Config config) {
//        return p -> {
//            ArrayList<String> intersection = new ArrayList<>(config.getHashtags());
//            intersection.retainAll(p.getHashtags());
//            if (p.getCreatedAt().compareTo(config.getDateFrom()) > 0
//            && p.getCreatedAt().compareTo(config.getDateTo()) < 0
//            && (p.getAuthor().equalsIgnoreCase(config.getAuthor()) || config.getAuthor().equalsIgnoreCase(""))
//            && (intersection.size() != 0 || config.getHashtags().size() == 0)) {
//                return true;
//            }
//            return false;
//        };
//    }


    @Override
    public String getPosts(Integer skip, Integer count, String dateFrom, String dateTo, String author, String hashtags) {
        Config config = new Config(dateFrom, dateTo, author, hashtags, skip, count);
        try {
            ArrayList<Post> posts = DBController.queryPosts(config);
            Gson gson = new Gson();
            return gson.toJson(posts);
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }

//    @Override
//    public String addPost(String JSONPost) {
//        try {
//            Gson gson = new Gson();
//            Type type = new TypeToken<Post>(){}.getType();
//            Post post = gson.fromJson(JSONPost, type);
//            boolean result = DBController.queryAdd(post);
//            return gson.toJson(result);
//        } catch (SQLException se) {
//            se.printStackTrace();
//        } catch (NamingException ne) {
//            ne.printStackTrace();
//        }
//        return null;
//
//        Gson gson = new Gson();
//        post.setId(this.getMaxId()+1);
//        System.out.println(post.getId());
//        posts.add(post);
//        return true;
//    }


//    public Integer getMaxId() {
//        Integer maxId = 0;
//        for (int i = 0 ; i < posts.size(); i++) {
//            if (posts.get(i).getId() > maxId) {
//                maxId = posts.get(i).getId();
//            }
//        }
//        return maxId;
//    }
//
//    public void editPost(String JSONEdits) {
//        Gson gson = new Gson();
//        Type type = new TypeToken<Post>(){}.getType();
//        Post edits = gson.fromJson(JSONEdits, type);
//        for (int i = 0; i < posts.size(); i++) {
//            if (posts.get(i).getId().equals(edits.getId())) {
//                posts.get(i).setDescription(edits.getDescription());
//                posts.get(i).setHashtags(edits.getHashtags());
//                posts.get(i).setPhotoLink(edits.getPhotoLink());
//                return;
//            }
//        }
//    }

    @Override
    public String getPost(String id) {
        try {
            Post post = DBController.queryPost(new Integer(id));
            Gson gson = new Gson();
            return gson.toJson(post);
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }

    @Override
    public String deletePost(String id) {
        try {
            boolean result = DBController.queryDelete(new Integer(id));
            Gson gson = new Gson();
            return gson.toJson(result);
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }
}
