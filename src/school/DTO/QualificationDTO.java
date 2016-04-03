package school.DTO;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class QualificationDTO {

	private String highestQualification;
	private String university;
	private String passYear;
	private String medium;
	private String distinction;
	private String marksheetNo;
	private String marks;
	
	@Column(name = "highest_qualification", length = 100)
	public String getHighestQualification() {
		return highestQualification;
	}
	public void setHighestQualification(String highestQualification) {
		this.highestQualification = highestQualification;
	}
	@Column(name = "university", length = 200)
	public String getUniversity() {
		return university;
	}
	public void setUniversity(String university) {
		this.university = university;
	}
	@Column(name = "pass_year", length = 100)
	public String getPassYear() {
		return passYear;
	}
	public void setPassYear(String passYear) {
		this.passYear = passYear;
	}
	@Column(name = "medium", length = 100)
	public String getMedium() {
		return medium;
	}
	public void setMedium(String medium) {
		this.medium = medium;
	}
	@Column(name = "distinction", length = 100)
	public String getDistinction() {
		return distinction;
	}
	public void setDistinction(String distinction) {
		this.distinction = distinction;
	}
	@Column(name = "marksheet_no", length = 100)
	public String getMarksheetNo() {
		return marksheetNo;
	}
	public void setMarksheetNo(String marksheetNo) {
		this.marksheetNo = marksheetNo;
	}
	@Column(name = "marks", length = 100)
	public String getMarks() {
		return marks;
	}
	public void setMarks(String marks) {
		this.marks = marks;
	}
	@Override
	public String toString() {
		return "QualificationDTO [highestQualification=" + highestQualification
				+ ", university=" + university + ", passYear=" + passYear
				+ ", medium=" + medium + ", distinction=" + distinction
				+ ", marksheetNo=" + marksheetNo + ", marks=" + marks + "]";
	}
	
	
	
	
}
