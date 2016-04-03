package school.admin.hbm_services;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;

import school.admin.hbm_model.EnquiryMST;
import school.common.HibernateUtil;

public class EnquiryService {
	
	public static String getMaxApplication()
	{
		String applicationNo = null;
		Session session = HibernateUtil.openSession();
		Criteria criteria = session.createCriteria(EnquiryMST.class).setProjection(Projections.max("applicationID"));
		applicationNo = (String)criteria.uniqueResult();	
		return applicationNo;
	}

	public static List getAllApplications()
	{
		
		return null;
	}
}
