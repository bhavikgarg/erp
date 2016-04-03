package school.admin.hbm_model;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import school.DTO.AddressDTO;

@Entity
@Table(name = "settings")
public class SettingsMST {

	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "school_name", nullable = false, length = 200)
	private String schoolName;
	
	@Embedded
	private AddressDTO address;
	
	@Column(name = "contact", nullable = false, length = 20)
	private String contact;
	
	@Column(name = "email", nullable = false, length = 100)
	private String email;
	
	@Column(name = "logo", nullable = false, length = 400)
	private String logoPath;
	
	@Column(name = "application_prefix", nullable = false, length = 20)
	private String prefix;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public AddressDTO getAddress() {
		return address;
	}
	public void setAddress(AddressDTO address) {
		this.address = address;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLogoPath() {
		return logoPath;
	}
	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	@Override
	public String toString() {
		return "SettingsMST [id=" + id + ", schoolName=" + schoolName
				+ ", address=" + address + ", contact=" + contact + ", email="
				+ email + ", logoPath=" + logoPath + ", prefix=" + prefix + "]";
	}
	
	
}
