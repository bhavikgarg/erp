package school.common;

public class MessageBinder {
	
	private boolean error;
	private String message;
	public boolean isError() {
		return error;
	}
	public void setError(boolean error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "MessageBinder [error=" + error + ", message=" + message + "]";
	}
	
	

}
