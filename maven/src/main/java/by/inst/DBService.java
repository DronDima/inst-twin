package by.inst;

import java.sql.Connection;

public interface DBService {
    String getPosts(Integer skip, Integer count, String dateFrom, String dateTo, String author, String hashtags);
    String getPost(String id);
    String deletePost(String id);
}
