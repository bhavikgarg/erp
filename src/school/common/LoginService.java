package school.common;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import school.DTO.LoginDTO;
import school.admin.hbm_model.Login;
 

public class LoginService {
	
	public boolean authenticateUser(LoginDTO loginDTO) {
        Login login = getLoginUser(loginDTO);         
        if(login!=null && login.getUserID().equals(loginDTO.getUsername()) && login.getPassword().equals(loginDTO.getPassword())){
            return true;
        }else{
            return false;
        }
    }
 
    public Login getLoginUser(LoginDTO loginDTO) {
        Session session = HibernateUtil.openSession();
        Transaction tx = null;
        Login login = null;
        try {
            tx = session.getTransaction();
            tx.begin();
            Query query = session.createQuery("from Login where username='"+loginDTO.getUsername()+"' AND password = '"+loginDTO.getPassword()+"' AND role = '"+loginDTO.getRole()+"'");
            login = (Login)query.uniqueResult();
            tx.commit();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return login;
    }
     
   /* public List<User> getListOfUsers(){
        List<User> list = new ArrayList<User>();
        Session session = HibernateUtil.openSession();
        Transaction tx = null;       
        try {
            tx = session.getTransaction();
            tx.begin();
            list = session.createQuery("from User").list();                       
            tx.commit();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return list;
    }*/


}
