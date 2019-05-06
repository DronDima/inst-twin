package by.inst;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.ArrayList;

public class Config {
    private Date dateFrom;
    private Date dateTo;
    private String author;
    private ArrayList<String> hashtags;

    public Config(String dateFrom, String dateTo, String author, String hashtags) {
        this.dateFrom = new Date(0L);
        this.dateTo = new Date(Long.MAX_VALUE);
        this.author = "";
        this.hashtags = new ArrayList<>();
        if (author != null) {
            this.author = author;
        }
        if (dateFrom != null && !dateFrom.trim().equals("null")) {
            this.dateFrom = new Date(new Long(dateFrom.trim()));
        }
        if (dateTo != null && !dateTo.trim().equals("null")) {
            this.dateTo = new Date(new Long(dateTo.trim()));
        }
        if (hashtags != null && !hashtags.equalsIgnoreCase("")) {
            this.hashtags = new ArrayList<>(Arrays.asList(hashtags.split(",")));
        }
    }

    public Date getDateTo() {
        return dateTo;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public String getAuthor() {
        return author;
    }

    public ArrayList<String> getHashtags() {
        return hashtags;
    }
}
