package by.inst;

public interface DBService {
    String getPosts(Integer skip, Integer count, String dateFrom, String dateTo, String author, String hashtags);
}
