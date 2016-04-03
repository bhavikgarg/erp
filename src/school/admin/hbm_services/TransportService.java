package school.admin.hbm_services;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import school.admin.hbm_model.StopMST;
import school.common.HibernateUtil;

public class TransportService {

	private static boolean check = false;
	
	
	public static boolean edit(StopMST stop) {
		
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			
			Query query=session.createQuery("update StopMST set area=:area , city=:city where id=:id");
			query.setInteger("id", stop.getId());
			query.setString("area", stop.getArea());
			query.setString("city", stop.getCity());
			int modifications=query.executeUpdate();
			
			
			tx.commit();
			
			if(modifications == 1)
				check = true;
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
		System.out.println("check is : "+check);
		return check;
		
	}

}
