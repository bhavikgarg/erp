package school.DTO;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AddressDTO {
	
	@Column(name = "type_of_address", nullable = false, length = 100)
	private String type;
	
	@Column(name = "address", nullable = false, length = 200)
	private String description;
	
	@Column(name = "city", nullable = true, length = 100)
	private String city;
	
	@Column(name = "state_id", length = 10, nullable = false)
	private int stateID;
	
	@Column(name = "zip_code", length = 100, nullable = true)
	private String pinCode;
	
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	
	public String getPinCode() {
		return pinCode;
	}
	
	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}
	
	
	public int getStateID() {
		return stateID;
	}
	public void setStateID(int stateID) {
		this.stateID = stateID;
	}
	
	
	@Override
	public String toString() {
		return "AddressDTO [type=" + type + ", description=" + description
				+ ", city=" + city + ", stateID=" + stateID + ", pinCode="
				+ pinCode +  "]";
	}
	
	
	

}
