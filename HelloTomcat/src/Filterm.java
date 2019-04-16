import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter("/filter")
public class Filterm implements Filter {

    public void init(FilterConfig fConfig) throws ServletException {

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        chain.doFilter(request, response);
        long end = System.currentTimeMillis();
        HttpServletRequest req = (HttpServletRequest) request;
        String requestURI = req.getRequestURL().toString();
        String method = req.getMethod();
        long time = end - start;
        response.getOutputStream().println(method + " - " + requestURI + " - " + time + "ms");
    }
    public void destroy() {

    }
}
