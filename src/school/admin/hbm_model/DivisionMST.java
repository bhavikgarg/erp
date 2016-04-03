package school.admin.hbm_model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

@Entity
@Table(name = "division_mst")

public class DivisionMST {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "div_ID")
	private int id;
	
	@Column(name = "divisionName", length = 200 , nullable = false)
	private String name;
	@Column(name = "status")
	private boolean status;
	
	@Column(name = "class_id", nullable = false , length = 100)
	private int classID;

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

	public int getClassID() {
		return classID;
	}

	public void setClassID(int classID) {
		this.classID = classID;
	}

	@Override
	public String toString() {
		return "DivisionMST [id=" + id + ", name=" + name + ", status="
				+ status + ", classID=" + classID + "]";
	}

		
}
