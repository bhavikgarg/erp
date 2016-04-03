package school.admin.hbm_model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="login_mst")
public class Login implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name="username", length = 400, nullable = false, unique = true)
	private String userID;
	
	@Column(name="name", length = 400, nullable = false)
	private String name;
	
	@Column(name="password" , length = 400, nullable = false)
	private String password;
	
	@Column(name="imagePath", length = 400 , nullable = false)
	private String imagePath;
	
	@Column(name="roleID", length=255, nullable = false)
	private int role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Login [id=" + id + ", userID=" + userID + ", name=" + name
				+ ", password=" + password + ", imagePath=" + imagePath
				+ ", role=" + role + "]";
	}

	
	
	
	
	

}
