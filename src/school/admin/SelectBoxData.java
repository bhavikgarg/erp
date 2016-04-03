package school.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import school.admin.hbm_model.ClassMST;
import school.admin.hbm_model.StateMST;

import com.google.gson.Gson;

/**
 * Servlet implementation class SelectBoxData
 */
@WebServlet("/selectBoxData")
public class SelectBoxData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SelectBoxData() {
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
		String json = "";
		PrintWriter out  = null;
		Gson gson = null;
		String section = request.getParameter("section");
		List<Object> list = null;
		if(section.equals("state"))
		{
			
			GenericDAOImpl<StateMST> obj = new GenericDAOImpl<StateMST>();
			list = obj.listActive(StateMST.class, "id");
			System.out.println("The list obtained is  : "+list);
			
		}
		else if(section.equals("class"))
		{
			GenericDAOImpl<ClassMST> obj = new GenericDAOImpl<ClassMST>();
			list = obj.listActive(ClassMST.class, "id");
			System.out.println("The list obtained is  : "+list);
		}
		
		gson = new Gson();
		json = gson.toJson(list);
		System.out.println("JSON is : "+json);
		out = response.getWriter();
		out.println(json);
		
	}

}
