package school.admin.hbm_model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "religion_mst")
public class ReligionMST {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "religion_id")
	private int id;
	
	@Column(name = "religion_name", length = 200 , unique = true , nullable = false)
	private String name;
	
	private boolean status;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ReligionMST [id=" + id + ", name=" + name + ", status="
				+ status + "]";
	}
	
	
}
