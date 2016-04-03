package school.admin.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

import com.google.gson.Gson;

import school.common.MessageBinder;
import school.common.ProjectConstants;

/**
 * Servlet Filter implementation class loginRole
 */
@WebFilter("/loginRole")
public class loginRole implements Filter {

    /**
     * Default constructor. 
     */
    public loginRole() {
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
		// place your code here
		String username = request.getParameter("username");
		System.out.println("Username is : "+username);
		
		MessageBinder mBinder = null;
		Gson gson = null;
		String json = null;
		System.out.println("First char : "+username.charAt(0));
		if(username.equals("admin"))
		{
			System.out.println("Role is : "+ProjectConstants.ADMIN);
			request.setAttribute("role", ProjectConstants.ADMIN);
			chain.doFilter(request, response);
		}
		else if(username.charAt(0) == '1')
		{
			System.out.println("Role is : "+ProjectConstants.STUDENT);
			request.setAttribute("role", ProjectConstants.STUDENT);
			chain.doFilter(request, response);
		}
		else if((int)username.charAt(0) == ProjectConstants.TEACHER)
		{
			request.setAttribute("role", ProjectConstants.TEACHER);
			chain.doFilter(request, response);
		}
		else if((int)username.charAt(0) == ProjectConstants.LIBRARY)
		{
			request.setAttribute("role", ProjectConstants.LIBRARY);
			chain.doFilter(request, response);
		}
		else if((int)username.charAt(0) == ProjectConstants.TRANSPORT)
		{
			request.setAttribute("role", ProjectConstants.TRANSPORT);
			chain.doFilter(request, response);
		}
		else if((int)username.charAt(0) == ProjectConstants.ACCOUNTS)
		{
			request.setAttribute("role", ProjectConstants.ACCOUNTS);
			chain.doFilter(request, response);
		}
		else if((int)username.charAt(0) == ProjectConstants.RECEPTION)
		{
			request.setAttribute("role", ProjectConstants.RECEPTION);
			chain.doFilter(request, response);
		}
		else
		{
			System.out.println("Invalid");
			mBinder = new MessageBinder();
			mBinder.setError(true);
			/* <i class = 'fa fa-frown-o fa-2x'></i> &nbsp; */			
			mBinder.setMessage("Invalid Credentials..");
			gson = new Gson();
			json = gson.toJson(mBinder);
			response.getWriter().println(json);
		}
		
		// pass the request along the filter chain
		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
