package school.admin;

import java.util.List;


public interface GenericDAO<T> {
	boolean create(T t);
	<T> List listAll(Class<T> t, String propertyName);
	<T> List listActive(Class<T> t, String propertyName);
	boolean activate(Class<T> t, int id);
	boolean inactivate(Class<T> t, int id);
	boolean del(Class<T> t , int id);
	boolean edit(Class<T> t, int id, String name);
	
	<T> List listDivOfClass(Class<T> t, int id);
}
