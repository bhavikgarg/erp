package school.DTO;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class NameDTO {
	
	private String firstName;
	private String middleName;
	private String lastName;
	
	@Column(name = "f_name", length = 200, nullable = false)
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	@Column(name = "m_name", length = 200, nullable = true)
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	@Column(name = "l_name", length = 200, nullable = true)
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	@Override
	public String toString() {
		return "NameDTO [firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + "]";
	}
	
	

}
