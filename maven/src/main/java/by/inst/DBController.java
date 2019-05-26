package by.inst;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.print.attribute.standard.MediaSize;
import javax.sql.DataSource;

public class DBController {
    public static Connection getConnection() throws NamingException, SQLException {
        InitialContext context = new InitialContext();
        DataSource ds = (DataSource) context.lookup("java:comp/env/jdbc/PhotoPortal");

        return ds.getConnection();
    }
    public static void returnConnection(Connection conn) throws SQLException {
        conn.close();
    }

    public static ArrayList<String> queryLikes(Connection conn, Integer id) throws SQLException, NamingException {
        PreparedStatement ps = conn.prepareStatement(
                "SELECT NAME FROM `PhotoPortalDB`.POSTS_LIKES\n" +
                        "\tJOIN `PhotoPortalDB`.USERS ON USERS.USER_ID = POSTS_LIKES.USER_ID\n" +
                        "\tWHERE POSTS_LIKES.POST_ID = ?");
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        ArrayList<String> likes = new ArrayList<>();
        while(rs.next()) {
            String like = rs.getString("NAME");
            likes.add(like);
        }
        return likes;
    }

    public static ArrayList<String> queryTags(Connection conn, Integer id) throws SQLException, NamingException {
        PreparedStatement ps = conn.prepareStatement(
                "SELECT TAG FROM `PhotoPortalDB`.POSTS_TAGS\n" +
                        "\tJOIN `PhotoPortalDB`.PHOTO_POSTS ON PHOTO_POSTS.POST_ID = POSTS_TAGS.POST_ID\n" +
                        "\tWHERE POSTS_TAGS.POST_ID = ?");
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        ArrayList<String> tags = new ArrayList<>();
        while(rs.next()) {
            String tag = rs.getString("TAG");
            tags.add(tag);
        }
        return tags;
    }

    public static Post queryPost(Integer id) throws SQLException, NamingException {
        Connection conn = DBController.getConnection();
        PreparedStatement ps = conn.prepareStatement(
                "SELECT * FROM `PhotoPortalDB`.PHOTO_POSTS" +
                        "\tWHERE POST_ID = ?");
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();

        Integer ID = rs.getInt("POST_ID");
        String description = rs.getString("DESCRIPTION");
        java.sql.Date date = rs.getDate("CREATION_DATE");
        String photoLink = rs.getString("PHOTO_LINK");
        Integer authorID = rs.getInt("USER_ID");

        Post post = new Post(ID, description, date, authorID, photoLink);
        post.setLikes(DBController.queryLikes(conn, id));
        post.setHashtags(DBController.queryTags(conn, id));

        DBController.returnConnection(conn);
        return post;
    }

    public static ArrayList<Post> queryPosts(Config config) throws SQLException, NamingException {
        Connection conn = DBController.getConnection();
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
        ps.setString(3, config.getAuthor());
        ps.setString(4, config.getAuthor());
        ps.setInt(5, config.getSkip());
        ps.setInt(6, config.getCount());
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
            post.setLikes(queryLikes(conn, post.getId()));
            post.setHashtags(queryTags(conn, post.getId()));
        }
        DBController.returnConnection(conn);
        return posts;
    }
}
