package school.admin;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import school.DTO.AddressDTO;
import school.admin.hbm_model.SettingsMST;
import school.admin.hbm_services.SettingService;
import school.common.MessageBinder;
import school.common.ProjectConstants;

import com.google.gson.Gson;

/**
 * Servlet implementation class saveSettings
 */
@WebServlet("/settings")
public class SettingsCtrl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private static final String UPLOAD_DIRECTORY = "upload";
	   
	private String filePath;
	private File uploadDir; 
	private boolean isMultiPart = false;
	private int maxFileSize = 5000 * 1024;
	private int maxMemSize = 10000 * 1024;
	private File file ;
	
	public void init()
	{
		// get the location where it is stored
		/*filePath = getServletContext().getInitParameter("file");
		System.out.println("PAth of file is : "+filePath);
		
		tempPath = getServletContext().getInitParameter("tmp");
		System.out.println("Temp path is : "+tempPath);*/
		filePath = getServletContext().getRealPath("")
	            + File.separator + UPLOAD_DIRECTORY;
	    // creates the directory if it does not exist
	    uploadDir = new File(filePath);
	    if (!uploadDir.exists()) {
	        uploadDir.mkdir();
	    }
	    System.out.println("File Path is : "+filePath);
	    
	}
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SettingsCtrl() {
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
		boolean check = true;
		MessageBinder mB = null;
		AddressDTO address = new AddressDTO();
		String action = request.getParameter("action");
		PrintWriter out = null;
		if(action.equals("save"))
		{
			out = response.getWriter();
			mB = new MessageBinder();
			SettingsMST settingsMST = new SettingsMST();
			
			
			isMultiPart = ServletFileUpload.isMultipartContent(request);
			
			// response.setContentType("text/html");
			if(!isMultiPart){
				mB.setError(true);
				mB.setMessage("No file uploaded");
				check = false;
			}
			
			DiskFileItemFactory factory = new DiskFileItemFactory();
			// maximum size that will be stored in memory
		    factory.setSizeThreshold(maxMemSize);
		     // Location to save data that is larger than maxMemSize.
		    factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
			
		      // Create a new file upload handler
		      ServletFileUpload upload = new ServletFileUpload(factory);
		      // maximum file size to be uploaded.
		      upload.setSizeMax( maxFileSize );
		      
		      
		      try{ 
		          // Parse the request to get file items.
		          List fileItems = upload.parseRequest(request);
		          System.out.println("File Items is : "+fileItems);
		          // Process the uploaded file items
		          Iterator i = fileItems.iterator();
		          System.out.println("Iterator Object is : "+i.toString());
		          
		          while ( i.hasNext () ) 
		          {
		             FileItem fi = (FileItem)i.next();
		             
		             System.out.println("File Item is : "+fi);
		             if ( !fi.isFormField () )	
		             {
		                // Get the uploaded file parameters
		                String fieldName = fi.getFieldName();
		                String fileName = fi.getName();
		                
		                System.out.println("Field Name : "+fieldName);
		                System.out.println("File Name : "+fileName);
		                
		                String contentType = fi.getContentType();
		                
		                System.out.println("Content Type : "+contentType);
		                boolean isInMemory = fi.isInMemory();
		                
		                System.out.println("Is is Memory "+isInMemory);
		                
		                long sizeInBytes = fi.getSize();
		                
		                System.out.println("Size in bytes : "+sizeInBytes);
		                
		                // Write the file
		                if( fileName.lastIndexOf("\\") >= 0 ){
		                   file = new File( filePath + 
		                   fileName.substring( fileName.lastIndexOf("\\"))) ;
		                }else{
		                   file = new File( filePath + 
		                   fileName.substring(fileName.lastIndexOf("\\")+1)) ;
		                }
		                fi.write( file ) ;
		                
		                System.out.println("path to upload is : "+filePath+File.separator+fileName);
		                settingsMST.setLogoPath(filePath+File.separator+fileName);
		                
		                
		             }
		             else if(fi.isFormField())
		             {
		            	 String fieldName = fi.getFieldName();
		            	 if(fieldName.equals("schoolName"))
		            	 {
		            		 settingsMST.setSchoolName(fi.getString());
		            	 }
		            	 else if(fieldName.equals("contact"))
		            	 {
		            		 settingsMST.setContact(fi.getString());
		            	 }
		            	 else if(fieldName.equals("email"))
		            	 {
		            		 settingsMST.setEmail(fi.getString());
		            	 }
		            	 else if(fieldName.equals("address"))
		            	 {
		            		 address.setDescription(fi.getString());
		            		 address.setType(ProjectConstants.PERM_ADDR);
		            	 }
		            	 else if(fieldName.equals("state"))
		            	 {
		            		 address.setStateID(Integer.parseInt(fi.getString()));
		            	 }
		            	 else if(fieldName.equals("pin"))
		            	 {
		            		 address.setPinCode(fi.getString());
		            	 }
		            	 else if(fieldName.equals("prefix"))
		            	 {
		            		 settingsMST.setPrefix(fi.getString());
		            	 }
		             }	
		          }
		          if(address.getDescription() != null){
			          settingsMST.setAddress(address);
			          System.out.println("Settings is : "+settingsMST);
			          
			          GenericDAOImpl<SettingsMST> obj = new GenericDAOImpl<SettingsMST>();
			          check = obj.create(settingsMST);
		            		  
		          }
		          
		       }catch(Exception ex) {
		           
		    	   mB.setError(true);
		    	   mB.setMessage("File not uploaded");
		    	   check = false;
		       }

			
			
			
		}
		
		System.out.println("Check is : "+check);
		if(check)
		{
			mB.setError(false);
			mB.setMessage("Processed Successfully");
		}
		else
		{
			mB.setError(true);
			mB.setMessage("Error in saving settings");
		}
		
		Gson gson = new Gson();
		String json = gson.toJson(mB);
		System.out.println("JSON is : "+json);
		out.println(json);
				
		
		
	}

}
