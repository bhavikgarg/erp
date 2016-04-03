<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" %>
<%@ taglib uri="../../WEB-INF/dateTag.tld" prefix="m" %>   <!-- custom tag library for current date printing -->
<div class = "row">    
	<div id="message" class="col-sm-12"> 
	    <!-- This div is for taking error messages -->
	</div>
</div>


<div class="box box-info">
    <div class="box-header with-border">
        <h3 class="box-title">Enquiry Form</h3>
        <button type = 'button' class = 'btn btn-info pull-right' id = 'importExcel' data-toggle="modal" data-target="#uploadExcel" ><i class = 'fa fa-paper-plane'></i> &nbsp; Import Excel Data</button>
    </div><!-- /.box-header -->
    <!-- form start -->
    <form class="form-horizontal" id = 'applicationForm' runat = "server">
      <div class="box-body">
      <br><br>
        
						
		<div class="form-group">
          <label for="formNumber" class="col-sm-2 control-label">Form #</label>
          <div class="col-sm-4">
              <input type="text" class="form-control" id="formNumber" name = 'formNumber' >
              <span class = 'help-block' style = 'color : red' id = 'formNumberErr'></span>
          </div>
          <label for="date" class="col-sm-2 control-label">Date : </label>
          <div class="col-sm-4">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
              <input type="text" class="form-control"  name = 'date'  id = 'date' readonly value = '<m:today/>'>
              <span class = 'help-block' style = 'color : red' id = 'dateErr'></span>
            </div><!-- /.input group -->
          </div>
        </div>
					
        <div class="form-group">
          <label for="s_name" class="col-sm-2 control-label">Student Name  </label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="s_name" placeholder="Student Name"  name = 's_name' onkeypress="return onlyAlphabets(event,this)">
            <span class = 'help-block' style = 'color : red' id = 's_nameErr'></span>
          </div>
        </div>
					
		<div class="form-group">
          <label for="f_name" class="col-sm-2 control-label">Father's Name</label>
          <div class="col-sm-10">
          	<div class="input-group">
              <div class="input-group-addon">
                <span>Mr</span>
              </div>
	            <input type="text" class="form-control" id="f_name" placeholder="Father's Name"  name = 'f_name'  onkeypress="return onlyAlphabets(event,this)">
	            
	        </div>
	        <span class = 'help-block' style = 'color : red' id = 'f_nameErr'></span>
          </div>
        </div>
					
		<div class="form-group">
          <label for="dob" class="col-sm-2 control-label">Date of Birth</label>
            <div class="col-sm-10">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="fa fa-calendar"></i>
                </div>
                <input type="date" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="" id = 'dob'  name = "dob">
                <span class = 'help-block' style = 'color : red' id = 'dobErr'></span>
              </div><!-- /.input group -->
            </div>
        </div>
				
		<div class="form-group">
          <label class="col-sm-2 control-label">Gender</label>
            <div class="col-sm-10">
              <label>
                <input type="radio" name="gender" class="minimal" value="m">
                &nbsp; Male &nbsp;&nbsp;
              </label>
              <label>
                <input type="radio" name="gender" class="minimal" value="f">
                &nbsp; Female &nbsp;&nbsp;
              </label>
            </div>
            <span class = 'help-block' style = 'color : red' id = 'genderErr'></span>
        </div>

        <div class="form-group">
          <label for="age" class="col-sm-2 control-label">Age</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="age" name = 'age' onkeypress="return isNumber(event)" onkeydown = "checkLength(this.value, event, 2)">
            <span class = 'help-block' style = 'color : red' id = 'ageErr'></span>
          </div>
        </div>
					
			
		<div class="form-group">
          <label class="col-sm-2 control-label">Class</label>
            <div class="col-sm-10">
			  <select class="form-control gradeSelect" name="class" id="class" >
                <!-- options are filled in dynamically -->                    
              </select>
              <span class = 'help-block' style = 'color : red' id = 'classErr'></span>
			</div>
        </div>
					
		<div class="form-group">
          <label class="col-sm-2 control-label">Last Passed</label>
          <div class="col-sm-10">
				<input type = "text" class="form-control" name="last_passed" id="last_passed"   onkeypress="return onlyAlphabets(event,this)">
            <span class = 'help-block' style = 'color : red' id = 'last_passedErr'></span>
		  </div>
        </div>
					
		<div class="form-group">
          <label class="col-sm-2 control-label">Year of Passing</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="pass_year" id="pass_year"  onkeypress="return isNumber(event)" onkeydown = "checkLength(this.value, event, 4)">
            <span class = 'help-block' style = 'color : red' id = 'pass_yearErr'></span>
		  </div>
        </div>
					
		<div class="form-group">
          <label class="col-sm-2 control-label">Address</label>
			<div class="col-sm-10">
				<textarea class="form-control" rows="3" id="address" placeholder="Enter your address" name = 'address'></textarea>
            	<span class = 'help-block' style = 'color : red' id = 'addressErr'></span>
			</div>
		</div>
		
		<div class="form-group">
          <label for="city" class="col-sm-2 control-label">City</label>
          <div class="col-sm-4">
              <input type="text" class="form-control" id="city" name = 'city'  onkeypress="return onlyAlphabets(event,this)">
              <span class = 'help-block' style = 'color : red' id = 'cityErr'></span>
          </div>
          <label for="state" class="col-sm-2 control-label">State </label>
          <div class="col-sm-4">
            
              <select name = 'state' id = 'state' class = 'form-control stateSelect'>
              	<!-- to be filled in dynamically -->
              </select>	
              <span class = 'help-block' style = 'color : red' id = 'stateErr'></span>
            
          </div>
        </div>
					
		<div class="form-group">
          <label class="col-sm-2 control-label">Father's Contact #</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="contact" id="contact"  placeholder = '+91-XXXXXXXXXX' onkeypress="return isNumber(event)" onkeydown = "checkLength(this.value, event, 10)">
              <span class = 'help-block' style = 'color : red' id = 'contactErr'></span>
			</div>
        </div>
        
        <div class="form-group">
          <label class="col-sm-2 control-label">Email ID</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="email" id="email"  placeholder = 'abc@example.com'  onkeydown = "checkLength(this.value, event, 50)">
              <span class = 'help-block' style = 'color : red' id = 'emailErr'></span>
			</div>
        </div>
					
		<div class="form-group">
          <label for="picture" class="col-sm-2 control-label">Image : </label>
          <div class="col-sm-5">
          	<div class = "row">
          		<div class = 'col-sm-offset-1'>
            		<input type = "file" name = 'file' id = 'image'>
            	</div>
            </div>
            <br>
            <div class = "row">
            
            	<div class = "col-sm-2 col-sm-offset-3" id = 'OR'>
            		<center>OR</center>
            	</div>
            
            </div>
            <br>
            <div class = "row">
            	<div class = 'col-sm-offset-1'>
					<button type = "button" id = "snap" class = "btn btn-info" data-toggle="modal" data-target="#snapshotModal">Take a snap now</button>
				</div>
            </div>
            <span class = 'help-block' style = 'color : red' id = 'imageErr'></span>
          </div>
          <div class = 'col-sm-5 pull-right' id = 'results'>
            <img id="preview" src="assets/img/profileImages/noImage.png" alt="user image" width = '100' height="100" class = 'img-responsive img-circle' />
            <input type = 'hidden' name = 'snapshot' id = 'snapInput'>
          </div>
        </div>
        			
      </div><!-- /.box-body -->
      
      <div class="box-footer">
        <div class="button-group pull-right">
  			<button type="submit" name = "submit" class="btn btn-success" id = 'submitApplication'>Submit</button>
          	<button type="reset" class="btn btn-danger">Reset</button>
        </div>
        <a href = 'home.php'><button type="button" class="btn btn-warning">Cancel</button></a>
      </div><!-- /.box-footer -->
    </form>
</div>

	<div id="uploadExcel" class="modal fade" role="dialog">

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"> Import Excel File </h4>
                </div>
                <div class="modal-body">

                      <div class = "row">

                          <div class = "col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 col-lg-10 col-lg-offset-1 col-sm-10 col-sm-offset-1">

                              <!-- form starts -->

                                  <div class="box-body">
                                      
                                          
                                      
                                      
                                      <div class="form-group">
                                      	
                                          <label for="file"> Select File </label>
                                          <input type="file" class="form-control" id="file" name = "file">
                                          <span class = "help-block" id = "fileError" style = "color : red"></span>
                                          
                                      </div>
									 
                                  </div><!-- /.box-body -->


                              <!--</form>-->
                          </div>
                      </div>  <!-- row for form ends -->

                </div>
                <div class="modal-footer">
                    <!-- data-toggle="modal" data-target="#surveyModal3" -->
                    <div class="button-group pull-right">
	                    <button type="submit" class="btn btn-success" id = "uploadExcel"><i class = "fa fa-upload"></i> &nbsp; Upload Excel &nbsp; </button>
	                    
						<button type = "reset" class = "btn btn-danger">Reset</button>
					</div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->

    </div><!-- /#uploadExcel -->

<!-- take snapshot modal -->
<div id="snapshotModal" class="modal fade" role="dialog">

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"> Take a snapshot now </h4>
                </div>
                <div class="modal-body">

                      <div class = "row">

                          <div class = "col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 col-lg-10 col-lg-offset-1 col-sm-10 col-sm-offset-1">

                              <!-- form starts -->

                                  <div class="box-body">
                                      
                                     <div class = "row" id = "takeSnapDiv">
        	
				        	<div class = "col-md-10">
				        	
				        		<div class = "row">
				        			
				        			<div class = "col-sm-3 col-sm-offset-2" style = "height : 200px">
				        				
				        				<!-- <video autoplay id="video" width="100%" height="100%"></video>--> 
				        				<div id = 'myCamera'></div>
				        				<br>
				            			
				        			</div>
				        			
				        			<div class = "col-md-3 col-sm-offset-2" style = "height : 200px">
				        				
				        				<!-- <canvas id="canvas" class = "thumbnail" style = "display : none"></canvas>--> 
				        				<div id = 'results'></div>
				        			    
				        			</div>
				        		
				        		</div>
				        	
				        	</div>
				        
        				</div>
									 
                                  </div><!-- /.box-body -->


                              <!--</form>-->
                          </div>
                      </div>  <!-- row for form ends -->
						<br><br>
                </div>
                <div class="modal-footer">
                    <!-- data-toggle="modal" data-target="#surveyModal3" -->
                    <div class="button-group pull-right">
	                    <button type = "button" id = "takePhoto" class = "btn btn-success btn-small"><i class = 'fa fa-camera'></i>&nbsp; Capture Image</button>
	                    
						<button type = "reset" id = 'cancel' class = "btn btn-danger" data-dismiss="modal">Cancel</button>
					</div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->

    </div><!-- /#snapshotModal -->



<!-- including webcam.js library -->
<script src = 'assets/webcam/webcam.min.js' type = 'text/javascript'></script>
<!-- custom js for this page -->
<script src= "assets/js/admin/application.js"></script>