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
import school.admin.hbm_model.DesignationMST;
import school.admin.hbm_model.DivisionMST;
import school.admin.hbm_model.NationalityMST;
import school.admin.hbm_model.ReligionMST;
import school.admin.hbm_services.SettingService;
import school.common.MessageBinder;

import com.google.gson.Gson;

/**
 * Servlet implementation class AdminCRUD
 */
@WebServlet("/adminCRUD")
public class AdminCRUD extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdminCRUD() {
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
		
		MessageBinder mB = null;
		PrintWriter out  = null;
		String json = "";
		boolean check = false;
		
		
		String section = request.getParameter("section");
		if(section.equals("class"))
		{
			List<ClassMST> list = null;
			String action = request.getParameter("action");
			GenericDAOImpl<ClassMST> obj = new GenericDAOImpl<ClassMST>();
			
			if(action.equals("add"))
			{
				String className = request.getParameter("grade");
				ClassMST classMST = new ClassMST();
				classMST.setName(className);
				classMST.setStatus(true);
				
				
				
				
				check = obj.create(classMST);
			}
			else if(action.equals("listAll"))
			{
				// System.out.println("Prefix is : "+SettingService.getPrefix());
				list = obj.listAll(ClassMST.class, "id");
				System.out.println("The list obtained is  : "+list);
				json = convertToJSON(list);
			}
			else if(action.equals("activate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to activate : "+id);
				check = obj.activate(ClassMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("inactivate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to inactivate : "+id);
				check = obj.inactivate(ClassMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("del"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to delete is : "+id);
				check = obj.del(ClassMST.class , id);
			}
			else if(action.equals("edit"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				String name = request.getParameter("name");
				
				System.out.println("Id to update : "+id+" and class to update : "+name);
				check = obj.edit(ClassMST.class , id, name);
				
			}
			
			
		}
		else if(section.equals("religion"))
		{
			String action = request.getParameter("action");
			GenericDAOImpl<ReligionMST> obj = new GenericDAOImpl<ReligionMST>();
			List<ReligionMST> list = null;
			if(action.equals("add"))
			{
				String religionName = request.getParameter("religion");
				System.out.println("The religion name is : "+religionName);
				ReligionMST religionMST = new ReligionMST();
				religionMST.setName(religionName);
				religionMST.setStatus(true);
				check = obj.create(religionMST);
			}
			else if(action.equals("activate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to activate : "+id);
				check = obj.activate(ReligionMST.class , id);
				System.out.println("Check is : "+check);
			}
			
			else if(action.equals("inactivate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to inactivate : "+id);
				check = obj.inactivate(ReligionMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("del"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to delete is : "+id);
				check = obj.del(ReligionMST.class , id);
			}
			else if(action.equals("edit"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				String name = request.getParameter("name");
				
				System.out.println("Id to update : "+id+" and class to update : "+name);
				check = obj.edit(ReligionMST.class , id, name);
				
			}
			else if(action.equals("listAll"))
			{
				list = obj.listAll(ReligionMST.class, "id");
				System.out.println("The list obtained is  : "+list);
				json = convertToJSON(list);
			}
		
		}
		else if(section.equals("nationality"))
		{
			String action = request.getParameter("action");
			GenericDAOImpl<NationalityMST> obj = new GenericDAOImpl<NationalityMST>();
			List<NationalityMST> list = null;
			if(action.equals("add"))
			{
				String nationalityName = request.getParameter("nationality");
				NationalityMST nationalityMST = new NationalityMST();
				nationalityMST.setName(nationalityName);
				nationalityMST.setStatus(true);
				check = obj.create(nationalityMST);
			}
			else if(action.equals("activate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to activate : "+id);
				check = obj.activate(NationalityMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("listAll"))
			{
				list = obj.listAll(NationalityMST.class, "id");
				System.out.println("The list obtained is  : "+list);
				json = convertToJSON(list);
			}
			else if(action.equals("inactivate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to inactivate : "+id);
				check = obj.inactivate(NationalityMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("del"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to delete is : "+id);
				check = obj.del(NationalityMST.class , id);
			}
			else if(action.equals("edit"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				String name = request.getParameter("name");
				
				System.out.println("Id to update : "+id+" and class to update : "+name);
				check = obj.edit(NationalityMST.class , id, name);
				
			}
		
		}
		else if(section.equals("designation"))
		{
			String action = request.getParameter("action");
			GenericDAOImpl<DesignationMST> obj = new GenericDAOImpl<DesignationMST>();
			List<DesignationMST> list = null;
			if(action.equals("add"))
			{
				String designationName = request.getParameter("designation");
				DesignationMST designationMST = new DesignationMST();
				designationMST.setName(designationName);
				designationMST.setStatus(true);
				check = obj.create(designationMST);
			}
			else if(action.equals("activate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to activate : "+id);
				check = obj.activate(DesignationMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("listAll"))
			{
				list = obj.listAll(DesignationMST.class, "id");
				System.out.println("The list obtained is  : "+list);
				json = convertToJSON(list);
			}
			else if(action.equals("inactivate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to inactivate : "+id);
				check = obj.inactivate(DesignationMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("del"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to delete is : "+id);
				check = obj.del(DesignationMST.class , id);
			}
			else if(action.equals("edit"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				String name = request.getParameter("name");
				
				System.out.println("Id to update : "+id+" and class to update : "+name);
				check = obj.edit(DesignationMST.class , id, name);
				
			}
		
		}
		else if(section.equals("division"))
		{
			String action = request.getParameter("action");
			GenericDAOImpl<DivisionMST> obj = new GenericDAOImpl<DivisionMST>();
			List<DivisionMST> list = null;
			if(action.equals("add"))
			{
				String divisionName = request.getParameter("division");
				DivisionMST divisionMST = new DivisionMST();
				divisionMST.setName(divisionName);
				divisionMST.setStatus(true);
				divisionMST.setClassID(Integer.parseInt(request.getParameter("grade")));
				check = obj.create(divisionMST);
			}
			else if(action.equals("activate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to activate : "+id);
				check = obj.activate(DivisionMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("listAll"))
			{
				int id = Integer.parseInt(request.getParameter("classID"));
				list = obj.listDivOfClass(DivisionMST.class, id);
				System.out.println("The list obtained is  : "+list);
				json = convertToJSON(list);
			}
			else if(action.equals("inactivate"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to inactivate : "+id);
				check = obj.inactivate(DivisionMST.class , id);
				System.out.println("Check is : "+check);
			}
			else if(action.equals("del"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				System.out.println("ID to delete is : "+id);
				check = obj.del(DivisionMST.class , id);
			}
			else if(action.equals("edit"))
			{
				int id = Integer.parseInt(request.getParameter("id"));
				String name = request.getParameter("name");
				
				System.out.println("Id to update : "+id+" and class to update : "+name);
				check = obj.edit(DivisionMST.class , id, name);
				
			}
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
