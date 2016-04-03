package school.admin.hbm_model;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import school.common.ProjectConstants;

public class TestLogin {
	
	public static void main(String[] args) {
		
		Login login = new Login();
		login.setUserID("admin");
		login.setName("Admin");
		String pwd = md5("admin");
		System.out.println("The encrypted password is : "+pwd);
		login.setPassword(pwd);
		login.setImagePath("assets/img/avatar.png");
		login.setRole(ProjectConstants.ADMIN);
		
		Login login1 = new Login();
		login1.setUserID("1165001");
		login1.setName("Bhavik");
		login1.setPassword(md5("abc123"));
		login1.setImagePath("assets/img/avatar.png");
		login1.setRole(ProjectConstants.STUDENT);
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction trans = session.beginTransaction();
		session.save(login);
		session.save(login1);
		trans.commit();
		session.close();
		System.out.println("Record Added...");
		
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
