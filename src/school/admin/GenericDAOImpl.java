package school.admin;

import java.util.List;

import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Order;

import school.admin.hbm_model.ClassMST;
import school.common.HibernateUtil;

public class GenericDAOImpl<T> implements GenericDAO<T> {

	private boolean check = false;
	protected Class<T> entityClass;

    
    

    public GenericDAOImpl() {
        /*ParameterizedType genericSuperclass = (ParameterizedType) getClass()
             .getGenericSuperclass();*/
        /*this.entityClass = (Class<T>) genericSuperclass
             .getActualTypeArguments()[0];*/
    	
    	/*
    	
    	Type genericSuperclass = this.getClass().getGenericSuperclass();
    	System.out.println("Generic super class is : "+genericSuperclass);
        if (genericSuperclass instanceof ParameterizedType) {
          ParameterizedType pt = (ParameterizedType) getClass().getGenericSuperclass();
          Type type = pt.getActualTypeArguments()[0];
          System.out.println("Type is : "+type);
          this.entityClass = (Class<T>) type;
          
          System.out.println("The class is : "+this.entityClass);
        }*/
    	
    }
	@Override
	public boolean create(T t) {
		
		
		System.out.println(t);
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			session.save(t);
			tx.commit();
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
		
		return check;
	}
	
	
	// Here propertyName specifies the name of property by which to apply the criteria
	@Override
	public <T> List listAll(Class<T> t, String propertyName)
	{
		List<T> list = null;
		
		System.out.println(t);
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
		    Criteria ct = session.createCriteria(t);
		    ct.addOrder(Order.asc(propertyName));
		    list = ct.list();
			tx.commit();
			
		}
		catch(HibernateException e)
		{
			if(tx != null)
				tx.rollback();
			
			System.out.println("Exception occurred : "+e);
			
		}
		finally {
			session.close();
		}
		return list;
	}
	@Override
	public boolean activate(Class<T> t, int id) {
		
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			
			Query query=session.createQuery("update "+t.getName()+" set status=:status where id=:id");
			query.setBoolean("status", true);
			query.setInteger("id", id);
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
		
		return check;
		
		
	}
	@Override
	public boolean inactivate(Class<T> t, int id) {
		
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			
			Query query=session.createQuery("update "+t.getName()+" set status=:status where id=:id");
			query.setBoolean("status", false);
			query.setInteger("id", id);
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
		
		return check;
		
		
	}
	@Override
	public boolean del(Class<T> t, int id) {
		
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			
			Query query=session.createQuery("delete from "+t.getName()+" where id=:id");
			
			query.setInteger("id", id);
			int rowsDeleted = query.executeUpdate();
			
			
			tx.commit();
			
			if(rowsDeleted == 1)
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
		System.out.println("Check in DAO is : "+check);
		return check;
		
		
		
		
	}
	@Override
	public boolean edit(Class<T> t, int id, String name) {
		
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
			
			Query query=session.createQuery("update "+t.getName()+" set name=:name where id=:id");
			query.setInteger("id", id);
			query.setString("name", name);
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
	@Override
	public <T> List listActive(Class<T> t, String propertyName) {
		List<T> list = null;
		
		System.out.println(t);
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
		    Query query = session.createQuery("from "+t.getName()+" WHERE status = true");
		    list = query.list();
			tx.commit();
			
		}
		catch(HibernateException e)
		{
			if(tx != null)
				tx.rollback();
			
			System.out.println("Exception occurred : "+e);
		}
		finally {
			session.close();
		}
		return list;
	}
	@Override
	public <T> List listDivOfClass(Class<T> t, int id) {
		// TODO Auto-generated method stub
		List<T> list = null;
		System.out.println(t);
		Session session = HibernateUtil.openSession();
		Transaction tx = null;
		// TODO Auto-generated method stub
		try {
			tx = session.beginTransaction();
		    Query query = session.createQuery("from "+t.getName()+" WHERE classID = "+id);
		    list = query.list();
			tx.commit();
			
		}
		catch(HibernateException e)
		{
			if(tx != null)
				tx.rollback();
			
			System.out.println("Exception occurred : "+e);
		}
		finally {
			session.close();
		}
		return list;
	}

	 
	
}
