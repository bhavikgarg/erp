package school.DTO;

public class LoginDTO {
	
	private String username;
	private String password;
	private int role;
	private String imagePath;
	
	
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	@Override
	public String toString() {
		return "LoginDTO [username=" + username + ", password=" + password
				+ ", role=" + role + ", imagePath=" + imagePath + "]";
	}
	
	
	

}
