import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "/check")
public class Check extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        PrintWriter writer = response.getWriter();
        writer.append("<!DOCTYPE html>\r\n")
                .append("<html>\r\n")
                .append("		<head>\r\n")
                .append("			<title>Button</title>\r\n")
                .append("		</head>\r\n")
                .append("		<body>\r\n")
                .append("			<form action=\"check\" method=\"POST\">\r\n")
                .append("				<input type=\"submit\" value=\"Check\" />\r\n")
                .append("			</form>\r\n")
                .append("		</body>\r\n")
                .append("</html>\r\n");
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getOutputStream().println(response.getStatus());
    }
}
