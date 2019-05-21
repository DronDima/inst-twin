package by.inst;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
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
        Config config = new Config(dateFrom, dateTo, author, hashtags);
        final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
        final String DB_URL = "jdbc:mysql://localhost?serverTimezone=UTC";

        final String USER = "admin";
        final String PASS = "Admin.12345";

        Connection conn = null;
        Statement stmt = null;

        try{
            Class.forName("com.mysql.jdbc.Driver");

            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            PreparedStatement ps = conn.prepareStatement(
                    "SELECT POST_ID, DESCRIPTION, CREATION_DATE, PHOTO_LINK, USERS.USER_ID, USERS.NAME\n" +
                            "\tFROM `PhotoPortalDB`.PHOTO_POSTS\n" +
                            "\tJOIN `PhotoPortalDB`.USERS ON PHOTO_POSTS.USER_ID = USERS.USER_ID\n" +
                            "\tWHERE PHOTO_POSTS.CREATION_DATE > ?\n" +
                            "\tAND PHOTO_POSTS.CREATION_DATE < ?\n" +
                            "\tAND (ISNULL(?) OR ? = USERS.NAME)\n" +
                            "\tORDER BY CREATION_DATE" +
                            "\tLIMIT ?, ?;");
            ps.setDate(1, config.getDateFrom());
            ps.setDate(2, config.getDateTo());
            ps.setString(3, author);
            ps.setString(4, author);
            ps.setInt(5, skip);
            ps.setInt(6, count);
            ResultSet rs = ps.executeQuery();
            ArrayList<Post> posts = new ArrayList<>();
            while(rs.next()){
                int ID = rs.getInt("POST_ID");
                String description = rs.getString("DESCRIPTION");
                java.sql.Date date = rs.getDate("CREATION_DATE");
                String photoLink = rs.getString("PHOTO_LINK");
                int authorID = rs.getInt("USER_ID");
                posts.add(new Post(ID, description, date, authorID, photoLink));
            }

            for(Post post: posts) {
                ps = conn.prepareStatement(
                        "SELECT NAME FROM `PhotoPortalDB`.POSTS_LIKES\n" +
                                "\tJOIN `PhotoPortalDB`.USERS ON USERS.USER_ID = POSTS_LIKES.USER_ID\n" +
                                "\tWHERE POSTS_LIKES.POST_ID = ?");
                ps.setInt(1, post.getId());
                rs = ps.executeQuery();
                ArrayList<String> likes = new ArrayList<>();
                while(rs.next()) {
                    String like = rs.getString("NAME");
                    likes.add(like);
                }
                post.setLikes(likes);
                ps = conn.prepareStatement(
                        "SELECT TAG FROM `PhotoPortalDB`.POSTS_TAGS\n" +
                                "\tJOIN `PhotoPortalDB`.PHOTO_POSTS ON PHOTO_POSTS.POST_ID = POSTS_TAGS.POST_ID\n" +
                                "\tWHERE POSTS_TAGS.POST_ID = ?");
                ps.setInt(1, post.getId());
                rs = ps.executeQuery();
                ArrayList<String> tags = new ArrayList<>();
                while(rs.next()) {
                    String tag = rs.getString("TAG");
                    tags.add(tag);
                }
                post.setHashtags(tags);
            }
            rs.close();
            Gson gson = new Gson();
            return gson.toJson(posts);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            try{
                if(stmt != null)
                    stmt.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
            try{
                if(conn != null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
        return null;
    }

//    public boolean addPost(String JSONPost) {
//        Gson gson = new Gson();
//        Type type = new TypeToken<Post>(){}.getType();
//        Post post = gson.fromJson(JSONPost, type);
//        post.setId(this.getMaxId()+1);
//        System.out.println(post.getId());
//        posts.add(post);
//        return true;
//    }
//
//
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
//
//    public String getPost(String id) {
//        for (int i = 0; i < posts.size(); i++) {
//            if (posts.get(i).getId().equals(new Integer(id))) {
//                Gson gson = new Gson();
//                return gson.toJson(posts.get(i));
//            }
//        }
//        return null;
//    }
//
//    public String deletePost(String id) {
//        Gson gson = new Gson();
//        boolean result;
//        for (int i = 0; i < posts.size(); i++) {
//            if (posts.get(i).getId().equals(new Integer(id))) {
//                posts.remove(i);
//                result = true;
//                return gson.toJson(result);
//            }
//        }
//        result = false;
//        return gson.toJson(result);
//    }
}
