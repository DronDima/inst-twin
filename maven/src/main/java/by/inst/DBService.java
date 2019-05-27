package by.inst;

import javax.naming.NamingException;
import java.sql.SQLException;

public interface DBService {
    String getPosts(Integer skip, Integer count, String dateFrom, String dateTo, String author, String hashtags);
    String getPost(String id) throws SQLException, NamingException;
    String deletePost(String id);
//    String addPost(String JSONPost);
}
