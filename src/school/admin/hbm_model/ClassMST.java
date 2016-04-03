package school.admin.hbm_model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "class_mst")
@org.hibernate.annotations.Entity(
		dynamicUpdate = true
)

public class ClassMST {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "classID")
	private int id;
	
	@Column(name = "className")
	private String name;
	
	@Column(name = "status")
	private boolean status;
	
	/*@OneToMany(mappedBy="classMST", fetch = FetchType.LAZY)
	
    private Set<DivisionMST> divisions;
	*/
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
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
	
	@Override
	public String toString() {
		return "ClassMST [id=" + id + ", name=" + name + ", status=" + status
				+ "]";
	}
	
	
	
	
	
}
