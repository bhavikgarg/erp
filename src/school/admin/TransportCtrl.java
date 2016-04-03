package school.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import school.admin.hbm_model.StopMST;
import school.admin.hbm_services.TransportService;
import school.common.MessageBinder;

/**
 * Servlet implementation class TransportCtrl
 */
@WebServlet("/transportCtrl")
public class TransportCtrl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TransportCtrl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		if(action.equals("listAll"))
		{
			List<StopMST> list = null;
			
			GenericDAOImpl<StopMST> obj = new GenericDAOImpl<StopMST>();
			list = obj.listAll(StopMST.class, "id");
			System.out.println("The list obtained is  : "+list);
			
			Gson gson = new Gson();
			out.println(gson.toJson(list));
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		MessageBinder mB = null;
		PrintWriter out  = null;
		String json = "";
		boolean check = false;
		
		List<StopMST> list = null;
		String action = request.getParameter("action");
		GenericDAOImpl<StopMST> obj = new GenericDAOImpl<StopMST>();
			
		if(action.equals("add"))
		{
			StopMST stopMST = new StopMST();
			stopMST.setArea(request.getParameter("area"));
			stopMST.setCity(request.getParameter("city"));
			stopMST.setStatus(true);
			check = obj.create(stopMST);
		}
		else if(action.equals("activate"))
		{
			int id = Integer.parseInt(request.getParameter("id"));
			System.out.println("ID to activate : "+id);
			check = obj.activate(StopMST.class , id);
			System.out.println("Check is : "+check);
		}
		else if(action.equals("inactivate"))
		{
			int id = Integer.parseInt(request.getParameter("id"));
			System.out.println("ID to inactivate : "+id);
			check = obj.inactivate(StopMST.class , id);
			System.out.println("Check is : "+check);
		}
		else if(action.equals("del"))
		{
			int id = Integer.parseInt(request.getParameter("id"));
			System.out.println("ID to delete is : "+id);
			check = obj.del(StopMST.class , id);
		}
		else if(action.equals("edit"))
		{
			StopMST stop = new StopMST();
			stop.setId(Integer.parseInt(request.getParameter("id")));
			stop.setArea(request.getParameter("area"));
			stop.setCity(request.getParameter("city"));
			check = TransportService.edit(stop);
		}
			
			
		
				
		if(json.equals("")){
			if(check)
			{
				mB = new MessageBinder();
				mB.setError(false);
				mB.setMessage("Processed Successfully");
			}
			else
			{
				mB = new MessageBinder();
				mB.setError(true);
				mB.setMessage("Processing failed..Try again");
			}
			json = convertToJSON(mB);
		}
		System.out.println("JSON is : "+json);
		
		out = response.getWriter();
		out.println(json);
		
	}
	
	

	
	private String convertToJSON(Object obj)
	{
		String json = null;
		Gson gson = new Gson();
		json = gson.toJson(obj);
		return json;
	}

}
