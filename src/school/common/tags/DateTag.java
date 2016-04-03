package school.common.tags;





import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

public class DateTag extends TagSupport{  
  
	public int doStartTag() throws JspException {  
	    JspWriter out=pageContext.getOut();//returns the instance of JspWriter  
	    try{  
	    	DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	        Date dateobj = new Date();
	        System.out.println(df.format(dateobj));
	     out.print(df.format(dateobj));//printing date and time using JspWriter  
	    }catch(Exception e){System.out.println(e);}  
	    return SKIP_BODY;//will not evaluate the body content of the tag  
	}  
}  