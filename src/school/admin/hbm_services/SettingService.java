package school.admin.hbm_services;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import school.admin.hbm_model.SettingsMST;
import school.common.HibernateUtil;

public class SettingService {
	
	private static boolean check = false;
	
	public static String getPrefix()
	{
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		String prefix = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			
			prefix = (String) session.createQuery("select prefix from SettingsMST").uniqueResult();
			
			tx.commit();
			
			
		}
		catch(HibernateException e)
		{
			if(tx != null)
				tx.rollback();
			
			System.out.println("Exception occurred : "+e);
			check = false;
		}
		finally {
			session.close();
		}
		
		
		return prefix;
	}
	
	
}
