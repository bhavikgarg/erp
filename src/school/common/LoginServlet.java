package school.common;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import school.DTO.LoginDTO;
import school.admin.hbm_model.Login;

import com.google.gson.Gson;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		MessageBinder mBinder = null;
		Gson gson = null;
		String json = null;
		System.out.println("Request recieved");
		String userID = request.getParameter("username");
		String pwd = request.getParameter("password");
		
		pwd = md5(pwd);
		System.out.println("The encrypted password is : "+pwd);
		
		int role = (int)request.getAttribute("role");
		
		LoginDTO loginDTO = new LoginDTO();
		loginDTO.setUsername(userID);
		loginDTO.setPassword(pwd);
		loginDTO.setRole(role);
		
		LoginService loginService = new LoginService();
		Login login = loginService.getLoginUser(loginDTO);
		
		if(login != null)
		{
			request.getSession(true).setAttribute("user", login);      
	        /*response.sendRedirect("home.jsp");*/
			mBinder = new MessageBinder();
			mBinder.setError(false);
			mBinder.setMessage("Login Successfull..Redirecting to home ,"+login.getRole());
			gson = new Gson();
			json = gson.toJson(mBinder);
			
			// response.getWriter().println(json);
			
	        System.out.println("Login success");
	        System.out.println("redirecting to home");
	        System.out.println("Login object is : "+login);
		}
		else
		{
			mBinder = new MessageBinder();
			mBinder.setError(true);
			/* <i class = 'fa fa-frown-o fa-2x'></i> &nbsp; */			
			mBinder.setMessage("Invalid Credentials..");
			gson = new Gson();
			json = gson.toJson(mBinder);
			System.out.println("login failed");
			System.out.println("login object is : "+login);
			// response.sendRedirect("index.jsp");
			
		}
		
		response.getWriter().println(json);
		// write database code here
		/*if(userID.equals("bhavik") && pwd.equals("bhavik"))
		{
			System.out.println("User logged in successfully");
			HttpSession session = request.getSession(true);
			session.setAttribute("username",userID);
			System.out.println("Session created is : "+session);
		}
		else
		{
			System.out.println("Login Fail");
		}*/
	}
	
	 public static String md5(String input) {
         
	        String md5 = null;
	         
	        if(null == input) return null;
	         
	        try {
	             
	        //Create MessageDigest object for MD5
	        MessageDigest digest = MessageDigest.getInstance("MD5");
	         
	        //Update input string in message digest
	        digest.update(input.getBytes(), 0, input.length());
	 
	        //Converts message digest value in base 16 (hex) 
	        md5 = new BigInteger(1, digest.digest()).toString(16);
	 
	        } catch (NoSuchAlgorithmException e) {
	 
	            e.printStackTrace();
	        }
	        return md5;
	    }
}
