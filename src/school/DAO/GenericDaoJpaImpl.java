package school.DAO;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

interface GenericDao<T , PK extends Serializable>
{
	T create(T t);
	
}


public class GenericDaoJpaImpl<T, PK extends Serializable> {
	
	protected Class<T> entityClass;
	
	@PersistenceContext
    protected EntityManager entityManager;
	
	 public GenericDaoJpaImpl() {
	        ParameterizedType genericSuperclass = (ParameterizedType) getClass()
	             .getGenericSuperclass();
	        this.entityClass = (Class<T>) genericSuperclass.getActualTypeArguments()[0];
	    }
	 
	 public T create(T t) {
	        this.entityManager.persist(t);
	        return t;
	    }


}

class Employee
{
	
}

class A
{
	public static void main(String[] args) {
		GenericDaoJpaImpl<Employee, Serializable> g = new GenericDaoJpaImpl<Employee, Serializable>();
		Employee emp = null;
		g.create(emp);
	}
}
