package school.DTO;

import javax.persistence.Embeddable;

@Embeddable
public class ExperienceDTO {
	
	private String institute;
	private String standard;
	private String fromYear;
	private String toYear;
	private String monthsWorked;
	private String domain;
	private String medium;
	public String getInstitute() {
		return institute;
	}
	public void setInstitute(String institute) {
		this.institute = institute;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getFromYear() {
		return fromYear;
	}
	public void setFromYear(String fromYear) {
		this.fromYear = fromYear;
	}
	public String getToYear() {
		return toYear;
	}
	public void setToYear(String toYear) {
		this.toYear = toYear;
	}
	public String getMonthsWorked() {
		return monthsWorked;
	}
	public void setMonthsWorked(String monthsWorked) {
		this.monthsWorked = monthsWorked;
	}
	
	public String getMedium() {
		return medium;
	}
	public void setMedium(String medium) {
		this.medium = medium;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	@Override
	public String toString() {
		return "ExperienceDTO [institute=" + institute + ", standard="
				+ standard + ", fromYear=" + fromYear + ", toYear=" + toYear
				+ ", monthsWorked=" + monthsWorked + ", domain=" + domain
				+ ", medium=" + medium + "]";
	}
	
	
	
	

}
