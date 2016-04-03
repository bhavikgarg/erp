package school.admin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import school.DTO.AddressDTO;
import school.admin.hbm_model.EnquiryMST;
import school.admin.hbm_services.EnquiryService;
import school.admin.hbm_services.SettingService;
import school.common.MessageBinder;
import school.common.ProjectConstants;
import sun.misc.BASE64Decoder;

import com.google.gson.Gson;

/**
 * Servlet implementation class EnquiryCtrl
 */
@WebServlet("/enquiryCtrl")
public class EnquiryCtrl extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    
	private static final String UPLOAD_DIRECTORY = "upload/profileImages";
	   
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
    public EnquiryCtrl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String action = request.getParameter("action");
		System.out.println("Request is Recieved");
		System.out.println("Action is : "+action);
		String appNo = "";
		PrintWriter out = response.getWriter();
		if(action.equals("getAppNo"))
		{
			System.out.println("Getting app no");
			String applicationNo = EnquiryService.getMaxApplication();
			System.out.println("Old num1 is : "+applicationNo);
			if(applicationNo != null)
			{
				System.out.println("Old num is : "+applicationNo);
				
				appNo = new StringBuffer().append(applicationNo.substring(0,4)).append(Integer.parseInt(applicationNo.substring(4)) + 1).toString();
				System.out.println("Application no is : "+appNo);
			}
			else
			{
				String formattedDate = new SimpleDateFormat("yy").format(Calendar.getInstance().getTime());
				appNo = new StringBuffer()
				 	.append(SettingService.getPrefix()).append(formattedDate).append("000001").toString();
				 
				 System.out.println("App no is : "+appNo);
			}
			
			out.println(appNo);
		}
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
			EnquiryMST enquiryMST = new EnquiryMST();
			
			
			isMultiPart = ServletFileUpload.isMultipartContent(request);
			System.out.println("multi part : "+isMultiPart);
			// if file is not uploaded , get other values from request without parsing it
			if(!isMultiPart){
				
				System.out.println("not multi part");	
			}
			// if file is uploaded , then parse request and upload all data
			else {
				
				System.out.println("running parse request sectionnnnnnnnnnnnnnnnn");
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
			            	if("file".equals(fi.getFieldName())){
			            		if(!(fi.getName() == null || fi.getName().isEmpty() || fi.getSize() == 0)){
			            			
			            		
			            	
					                
					                String fileName = fi.getName();
					                
					                
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
					                enquiryMST.setImagePath(filePath+File.separator+fileName);
					                
			            		}
			            	}
			             }
			             else
			             {
			            	 String fieldName = fi.getFieldName();
			            	 if(fieldName.equals("formNumber"))
			            	 {
			            		 enquiryMST.setApplicationID(fi.getString());
			            	 }
			            	 else if(fieldName.equals("date"))
			            	 {
			            		 Date date = (Date) new SimpleDateFormat("dd/MM/yyyy").parse(fi.getString());
			            		 /*DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			            	     Date convertedDate = (Date) formatter.parse(fi.getString());*/

			            	     System.out.println("Converted data of app is : "+date);
			            		 enquiryMST.setDateOfApplication(date);
			            	 }
			            	 else if(fieldName.equals("s_name"))
			            	 {
			            		 enquiryMST.setName(fi.getString());
			            	 }
			            	 else if(fieldName.equals("f_name"))
			            	 {
			            		 enquiryMST.setFatherName(fi.getString());
			            	 }
			            	 else if(fieldName.equals("dob"))
			            	 {
			            		 Date date1 = (Date) new SimpleDateFormat("yyyy-MM-dd").parse(fi.getString());
			            		 System.out.println("Converted data of dob is : "+date1);
			            		 enquiryMST.setDob(date1);
			            	 }
			            	 else if(fieldName.equals("gender"))
			            	 {
			            		 enquiryMST.setGender(fi.getString().charAt(0));
			            	 }
			            	 else if(fieldName.equals("age"))
			            	 {
			            		 enquiryMST.setAge(Integer.parseInt(fi.getString()));
			            	 }
			            	 else if(fieldName.equals("class"))
			            	 {
			            		 enquiryMST.setClassID(Integer.parseInt(fi.getString()));
			            	 }
			            	 else if(fieldName.equals("last_passed"))
			            	 {
			            		 enquiryMST.setLastPassed(fi.getString());
			            	 }
			            	 else if(fieldName.equals("pass_year"))
			            	 {
			            		 enquiryMST.setPassYear(Integer.parseInt(fi.getString()));
			            	 }
			            	 else if(fieldName.equals("address"))
			            	 {
			            		 address.setDescription(fi.getString());
			            		 address.setType(ProjectConstants.PERM_ADDR);
			            	 }
			            	 else if(fieldName.equals("city"))
			            	 {
			            		 address.setCity(fi.getString());
			            	 }
			            	 else if(fieldName.equals("state"))
			            	 {
			            		 address.setStateID(Integer.parseInt(fi.getString()));
			            	 }
			            	 else if(fieldName.equals("contact"))
			            	 {
			            		 enquiryMST.setFatherContact(fi.getString());
			            	 }
			            	 else if(fieldName.equals("snapshot"))
			            	 {
			            		 String snap = fi.getString();
			            		 if(snap != null)
			            		 {
			            			 snap = snap.substring(snap.indexOf(",") + 1); 
			            			 System.out.println("PNG image data on Base64: " +snap); 
			            			 FileOutputStream output = new FileOutputStream(filePath+File.separator+enquiryMST.getApplicationID()+".jpg"); 
			            			 output.write(new BASE64Decoder().decodeBuffer(snap)); 
			            			 output.flush(); 
			            			 output.close();
			            			 enquiryMST.setImagePath(filePath+File.separator+enquiryMST.getApplicationID()+".jpg");
			            		 }
			            	 }
			             }	
			          }
			          if(address.getDescription() != null){
				          enquiryMST.setAddress(address);
				          System.out.println("Enquiry is : "+enquiryMST);
				          
				          System.out.println("Out of all : "+enquiryMST);
				          GenericDAOImpl<EnquiryMST> obj = new GenericDAOImpl<EnquiryMST>();
					      check = obj.create(enquiryMST);
			            		  
			          }
			          
			       }
			      catch(Exception ex) {
			           
			    	   System.out.println("Exception : "+ex.getMessage());
			    	   mB.setError(true);
			    	   mB.setMessage("File not uploaded");
			    	   check = false;
			       }

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
	
	public static String lPadZero(int in, int fill){

	    boolean negative = false;
	    int value, len = 0;

	    if(in >= 0){
	        value = in;
	    } else {
	        negative = true;
	        value = - in;
	        in = - in;
	        len ++;
	    }

	    if(value == 0){
	        len = 1;
	    } else{         
	        for(; value != 0; len ++){
	            value /= 10;
	        }
	    }

	    StringBuilder sb = new StringBuilder();

	    if(negative){
	        sb.append('-');
	    }

	    for(int i = fill; i > len; i--){
	        sb.append('0');
	    }

	    sb.append(in);

	    return sb.toString();       
	}

}
