package school.admin.filters;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import school.admin.hbm_model.Login;
import school.common.MessageBinder;
import school.common.ProjectConstants;

/**
 * Servlet Filter implementation class SessionAuthentication
 */
@WebFilter(dispatcherTypes = {DispatcherType.REQUEST }
					, urlPatterns = { "/*"})
public class SessionAuthentication implements Filter {
	
	private ServletContext context;

    /**
     * Default constructor. 
     */
    public SessionAuthentication() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
			System.out.println("Session Filter called");
		 
			HttpServletResponse res = (HttpServletResponse) response;
			
			HttpServletRequest req = (HttpServletRequest) request;
	        HttpSession session = req.getSession(false);       
	        Login login = null;
	        System.out.println("Session is : "+session);
	        if (session != null) {
	            login = (Login) session.getAttribute("user");
	        }
	        System.out.println("Login is : "+login);
	        System.out.println("Path is : "+req.getContextPath());
	        System.out.println("Request is for : "+req.getRequestURI());
	        String requestedUri = req.getRequestURI();
	        
	        boolean isLoggedIn = (login != null);
	        
	        if (requestedUri.indexOf(".css") > 0){
	        	System.out.println("css loaded");
	            chain.doFilter(request, response);
	        }
	        else if(requestedUri.indexOf(".png") > 0 || requestedUri.indexOf(".jpg") > 0 || requestedUri.indexOf(".jpeg") > 0 || requestedUri.indexOf(".gif") > 0){
	        	System.out.println("images loaded");
	            chain.doFilter(request, response);
	        }
	        else if(requestedUri.indexOf(".js") > 0 && requestedUri.indexOf(".jsp") <= 0){
	        	System.out.println("js loaded");
	            chain.doFilter(request, response);
	        }
	        else if(requestedUri.indexOf(".eot") > 0){
	        	System.out.println("eot loaded");
	            chain.doFilter(request, response);
	        }
	        else if(requestedUri.indexOf(".woff2") > 0){
	        	System.out.println("woff2 & woff loaded");
	            chain.doFilter(request, response);
	        }
	        
	        else if(requestedUri.indexOf(".ttf") > 0){
	        	System.out.println("ttf loaded");
	            chain.doFilter(request, response);
	        }
	        
	        else if(req.getRequestURI().equals(req.getContextPath() + "/"))
	        {
	        	if(isLoggedIn)
	        	{
	        		System.out.println("Request for / and logged in");
	        		res = (HttpServletResponse) response;
	        		
	        		int role = login.getRole();
	        		
	        		if(role == ProjectConstants.ADMIN){
	        			System.out.println("Sending to : home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/home.jsp");
	        		}
	        		else if(role == ProjectConstants.STUDENT){
	        			System.out.println("Sending to : s/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/s/home.jsp");
	        		}
	        		else if(role == ProjectConstants.TEACHER){
	        			System.out.println("Sending to : e/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/e/home.jsp");
	        		}
	        		else if(role == ProjectConstants.LIBRARY){
	        			System.out.println("Sending to : l/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/l/home.jsp");
	        		}
	        		else if(role == ProjectConstants.TRANSPORT){
	        			System.out.println("Sending to : t/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/t/home.jsp");
	        		}
	        		
	               /* res.sendRedirect(req.getContextPath()
	                        + "/home.jsp");*/
	        	}
	        	else
	        	{
	        		System.out.println("Request for / and logged in");
	        		chain.doFilter(request, response);
	        	}
	        }
	        /*else if (isLoggedIn) {
	            chain.doFilter(request, response);
	        }*/
	        
	        
	        // Check if the user is accessing login page
	        else if (req.getRequestURI().equals(
	                req.getContextPath() + "/index.jsp") || req.getRequestURI().equals(req.getContextPath()+"/login")) {
	        /*else if (req.getRequestURI().equals(
	                req.getContextPath() + "/index.jsp")) {*/
	            if (isLoggedIn) {
	                // Redirect to landing or home page
	            	System.out.println("Going to home page");
	                res = (HttpServletResponse) response;
	                
	                int role = login.getRole();
	        		
	        		if(role == ProjectConstants.ADMIN){
	        			System.out.println("Sending to : home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/home.jsp");
	        		}
	        		else if(role == ProjectConstants.STUDENT){
	        			System.out.println("Sending to : s/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/s/home.jsp");
	        		}
	        		else if(role == ProjectConstants.TEACHER){
	        			System.out.println("Sending to : e/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/e/home.jsp");
	        		}
	        		else if(role == ProjectConstants.LIBRARY){
	        			System.out.println("Sending to : l/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/l/home.jsp");
	        		}
	        		else if(role == ProjectConstants.TRANSPORT){
	        			System.out.println("Sending to : t/home.jsp");
	        			res.sendRedirect(req.getContextPath()
		                        + "/t/home.jsp");
	        		}
	                
	                /*res.sendRedirect(req.getContextPath()
	                        + "/home.jsp");*/
	            	/*mB = new MessageBinder();
	            	mB.setError(false);
	            	mB.setMessage("Login Successful");
	            	gson = new Gson();
	            	json = gson.toJson(mB);
	            	out.println(json);*/
	            	
	            } else {
	                // Otherwise, nothing to do if he has not logged in
	                // pass the request along the filter chain
	            	System.out.println("Request Passed");
	                chain.doFilter(request, response);
	            	/*mB = new MessageBinder();
	            	mB.setError(true);
	            	mB.setMessage("Invalid Credentials");
	            	gson = new Gson();
	            	json = gson.toJson(mB);
	            	out.println(json);*/
	            }
	        }
	        /*else if(req.getRequestURI().equals(req.getContextPath()+"/login"))
	        {
	        	if(isLoggedIn)
	        	{
	        		mB = new MessageBinder();
	            	mB.setError(false);
	            	mB.setMessage("Login Successful");
	            	gson = new Gson();
	            	json = gson.toJson(mB);
	            	out.println(json);
	        	}
	        	else
	        	{
	        		mB = new MessageBinder();
	            	mB.setError(true);
	            	mB.setMessage("Invalid Credentials");
	            	gson = new Gson();
	            	json = gson.toJson(mB);
	            	out.println(json);
	        	}
	        	
	        }*/
	        else if (isLoggedIn) {
	        	System.out.println("sending to logout");
	            chain.doFilter(request, response);
	        }
	        else {
	            // For all other pages,
	            if (isLoggedIn) {
	                // Nothing to do
	            	System.out.println("for all pages");
	                chain.doFilter(request, response);
	            } else {
	                // Redirect to login page if he has not logged in
	            	System.out.println("Redirecting to index");
	                
	                res.sendRedirect(req.getContextPath() + "/index.jsp");
	            }
	        }
	
	
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
		this.context = fConfig.getServletContext();
		
		/*String urls = fConfig.getInitParameter("avoid-urls");
        StringTokenizer token = new StringTokenizer(urls, ",");
 
        urlList = new ArrayList<String>();
        
        while (token.hasMoreTokens()) {
            urlList.add(token.nextToken());
 
        }
        System.out.println("list is : "+urlList);
*/	}

}
