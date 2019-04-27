package by.inst;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@WebServlet(name = "UploadServlet")
@MultipartConfig
public class UploadServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part part = request.getPart("upload");
        InputStream stream = part.getInputStream();
        File uploads = new File(getServletContext().getInitParameter("uploadDirectory"));
        File file = new File(uploads, part.getSubmittedFileName());
        Files.copy(stream, file.toPath());
        response.getOutputStream().println(part.getSubmittedFileName());
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String imageName = request.getParameter("image");
        response.getOutputStream().println("<img src = 'resources/img/" + imageName + "' alt=\"File not found.\"/>");
    }
}

