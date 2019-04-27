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

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part part = request.getPart("upload");
        InputStream stream = part.getInputStream();
        File uploads = new File(getServletContext().getInitParameter("uploadDirectory"));
        File file = new File(uploads, part.getSubmittedFileName());
        Files.copy(stream, file.toPath());
        response.getOutputStream().println(part.getSubmittedFileName());

        String JSONPost = request.getReader().readLine();
        String result = Boolean.toString(posts.addPost(JSONPost));
        response.getWriter().write(result);
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //String JSONEdits = request.getReader().readLine();
        //posts.editPost(JSONEdits);
        response.getWriter().write(Boolean.toString(true));
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        response.getWriter().write(Boolean.toString(posts.deletePost(id)));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String id = request.getParameter("id");
        String result = id != null ? posts.getPost(id) : posts.getPosts();
        response.getWriter().write(result);
    }
}
