package by.inst;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.ArrayList;

public class Config {
    private java.sql.Date dateFrom;
    private java.sql.Date dateTo;
    private String author;
    private ArrayList<String> hashtags;

    public Config(String dateFrom, String dateTo, String author, String hashtags) {
        this.dateFrom = new java.sql.Date(0L);
        this.dateTo = new java.sql.Date(Long.MAX_VALUE);
        this.author = "";
        this.hashtags = new ArrayList<>();
        if (dateFrom != null && !dateFrom.trim().equals("null")) {
            this.dateFrom = new java.sql.Date(new Long(dateFrom.trim()));
        }
        if (dateTo != null && !dateTo.trim().equals("null")) {
            this.dateTo = new java.sql.Date(new Long(dateTo.trim()));
        }
        if (hashtags != null && !hashtags.equalsIgnoreCase("")) {
            this.hashtags = new ArrayList<>(Arrays.asList(hashtags.split(",")));
        }
    }

    public java.sql.Date getDateTo() {
        return dateTo;
    }

    public java.sql.Date getDateFrom() {
        return dateFrom;
    }

    public String getAuthor() {
        return author;
    }

    public ArrayList<String> getHashtags() {
        return hashtags;
    }
}
