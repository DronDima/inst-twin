package by.inst;

import com.google.gson.annotations.JsonAdapter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collection;

@WebServlet(name = "Posts")
@MultipartConfig
public class PostsServlet extends HttpServlet {

    private Posts posts = new Posts();

//    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        String JSONPost = request.getReader().readLine();
//        String result = Boolean.toString(posts.addPost(JSONPost));
//        response.getWriter().write(result);
//    }
//
//    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        String JSONEdits = request.getReader().readLine();
//        posts.editPost(JSONEdits);
//    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        String result = posts.deletePost(id);
        response.getWriter().write(result);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String id = request.getParameter("id");
        Integer skip = new Integer(request.getParameter("skip"));
        Integer count = new Integer(request.getParameter("count"));
        String dateFrom = request.getParameter("from");
        String dateTo = request.getParameter("to");
        String author = request.getParameter("author");
        String hashtags = request.getParameter("hashtags");
        String result = id != null ? posts.getPost(id) : posts.getPosts(skip, count, dateFrom, dateTo, author, hashtags);
        response.getWriter().write(result);
    }
}
