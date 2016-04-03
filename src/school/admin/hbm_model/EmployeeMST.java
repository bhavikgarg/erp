package school.admin.hbm_model;

import java.sql.Date;
import java.util.Collection;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import school.DTO.AddressDTO;
import school.DTO.ExperienceDTO;
import school.DTO.NameDTO;
import school.DTO.QualificationDTO;

@Entity
@Table(name = "employee_mst")
public class EmployeeMST {
	
	@Id
	@Column(name = "emp_id")
	private int id;
	
	@Embedded
	private NameDTO name;
	
	@Column(name = "image", length = 500, nullable = false)
	private String imagePath;
	
	@Column(name = "d_o_b", length = 100, nullable = false)
	private Date date;
	
	@Column(name = "gender", nullable = false)
	private char gender;
	
	@Column(name = "marital_status", length = 100, nullable = true)
	private String maritalStatus;
	
	@Embedded
	private Set<AddressDTO> addresses;   // implement equals and hashCode
	
	@Column(name = "mobile", length = 100, nullable = false)
	private String mobile;
	
	@Column(name = "landline", length = 100, nullable = true)
	private String landline;
	
	@Column(name = "email", length = 400, nullable = false)
	private String email;
	
	@Column(name = "adhar_id", length = 100, nullable = true)
	private String adharNo;
	
	@Column(name = "voter_id", length = 100, nullable = true)
	private String voterID;
	
	@Embedded
	private QualificationDTO qualification;
	
	@Column(name = "joining_date", length = 100, nullable = false)
	private Date joiningDate;
	
	@Column(name = "experience_years", length = 10)
	private int experienceYears;
	
	@ElementCollection
	private Collection<ExperienceDTO> experience;
	
	private boolean status;
	
	@OneToOne
	private DesignationMST designation;
	
}
