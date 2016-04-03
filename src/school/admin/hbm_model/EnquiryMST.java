package school.admin.hbm_model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import school.DTO.AddressDTO;

@Entity
@Table(name = "enquiry_mst")
@DynamicInsert
public class EnquiryMST {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "application_id", length = 100, nullable = false)
	private String applicationID;
	
	@Column(name = "name" , length = 100 , nullable = false)
	private String name;
	
	@Column(name = "date_of_application", nullable = false, length = 15)
	private Date dateOfApplication;
	
	@Column(name = "father_name", length = 150 , nullable = false)
	private String fatherName;
	
	@Column(nullable = false)
	private int age;
	
	@Column(name = "d_o_b", nullable = false, length = 15)
	private Date dob;
	
	@Column(name = "class_id")
	private int classID;
	
	@Column(name = "pass_year")
	private int passYear;
	
	@Column(name = "last_pass")
	private String lastPassed;
	private char gender;
	
	@Column(name = "father_contact", nullable = false, length = 10)
	private String fatherContact;
	
	@Column(name = "father_email", length = 50)
	private String email;
	
	@Embedded
	private AddressDTO address;
	
	@Column(name = "image", nullable = false, length = 200)
	private String imagePath = "assets/img/profileImages/noImage.png";

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApplicationID() {
		return applicationID;
	}

	public void setApplicationID(String applicationID) {
		this.applicationID = applicationID;
	}

	
	public Date getDateOfApplication() {
		return dateOfApplication;
	}

	public void setDateOfApplication(Date dateOfApplication) {
		this.dateOfApplication = dateOfApplication;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public int getClassID() {
		return classID;
	}

	public void setClassID(int classID) {
		this.classID = classID;
	}

	public int getPassYear() {
		return passYear;
	}

	public void setPassYear(int passYear) {
		this.passYear = passYear;
	}

	public String getLastPassed() {
		return lastPassed;
	}

	public void setLastPassed(String lastPassed) {
		this.lastPassed = lastPassed;
	}

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public String getFatherContact() {
		return fatherContact;
	}

	public void setFatherContact(String fatherContact) {
		this.fatherContact = fatherContact;
	}

	public AddressDTO getAddress() {
		return address;
	}

	public void setAddress(AddressDTO address) {
		this.address = address;
	}

	public String getImagePath() {
		return (this.imagePath == null) ? "assets/img/profileImages/noImage.png" : imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "EnquiryMST [id=" + id + ", applicationID=" + applicationID
				+ ", name=" + name + ", dateOfApplication=" + dateOfApplication
				+ ", fatherName=" + fatherName + ", age=" + age + ", dob="
				+ dob + ", classID=" + classID + ", passYear=" + passYear
				+ ", lastPassed=" + lastPassed + ", gender=" + gender
				+ ", fatherContact=" + fatherContact + ", email=" + email
				+ ", address=" + address + ", imagePath=" + imagePath + "]";
	}

	
	
	

}
