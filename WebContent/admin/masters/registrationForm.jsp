<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<form role = 'form' id = 'registrationForm' runat = "server" class="form-horizontal">
<div class="box box-info">
    <div class="box-header with-border">
        <h3 class="box-title">Registration Form</h3>
        <button type = 'button' class = 'btn btn-info pull-right' id = 'addRegistration'><i class = 'fa fa-plus'></i> &nbsp; Register</button>
    </div><!-- /.box-header -->
    <!-- form start -->
    
      <div class="box-body">
		<div class="row">
		  <div class="col-md-10 col-md-offset-1">
		    <div class = 'row'>
		      <div class = 'col-md-8 col-md-offset-3'>
		        <div id = 'message'></div>
		      </div>
		    </div>
		    <div class = 'row'>
		      <div class="nav-tabs-custom">
		        <ul class="nav nav-tabs"  style = "margin-top : 20px">
		            <li class="active"><a href="#personal" data-toggle="tab">Personal Details</a></li>
		            <li><a href="#education" data-toggle="tab" id = "educationTab">Educational Background</a></li>
		            <li><a href="#parents" data-toggle="tab" id = "parentsTab">Parents / Guardians</a></li>
		            <li><a href="#address" data-toggle="tab" id = "addressTab">Address Details</a></li>
		            <li><a href="#conveyance" data-toggle="tab" id = "conveyanceTab">Conveyance</a></li>
		            <li><a href="#medical" data-toggle="tab" id = "medicalTab">Medical Fitness</a></li>
		        </ul>
		        
		        <div class="tab-content">
		            <div class="tab-pane active" id="personal">
		              <div class = 'box-body'>
		                <div class = 'row' style = 'margin-top : 30px'>
		                	<div class = 'col-md-8'>
		                		<div class="form-group">
						          <label class="col-sm-4 control-label">Admission No </label>
						            <div class="col-sm-8">
						              <input type="text" class="form-control" name="adm_no" id="adm_no" required>
						            </div>
						        </div>
		                		<div class="form-group">
						          <label class="col-sm-4 control-label">Student Name</label>
						            <div class="col-sm-8">
						              <input type="text" class="form-control" name="s_name" id="studentName" required value = "<?php echo $row['studentName'] ?>" readonly>
						            </div>
						        </div>
						        <div class="form-group">
						          <label class="col-sm-4 control-label">Gender</label>
						            <div class="col-sm-8">
						              <label>
						              <?php 
						              	if($row['gender'] == 'm')
						              	{
						              ?>
						                <input type="radio" name="gender" class="minimal" value="m" checked>
						                &nbsp; Male &nbsp;&nbsp;
						              </label>
						              <label>
						              	<input type="radio" name="gender" class="minimal" value="f">
						                &nbsp; Female &nbsp;&nbsp;
						              </label>
						              <?php 
						              	}
						              	else
						              	{
						              ?>
						              <label>
						              	<input type="radio" name="gender" class="minimal" value="m">
						                &nbsp; Male &nbsp;&nbsp;
						              </label>
						              <label>
						                <input type="radio" name="gender" class="minimal" value="f" checked>
						                &nbsp; Female &nbsp;&nbsp;
						              </label>
						              <?php } ?>
						            </div>
						            
						        </div>
						        <br>
						        <div class="form-group">
						          <label for="dob" class="col-sm-4 control-label">Date of Birth</label>
						            <div class="col-sm-8">
						              <div class="input-group">
						                <div class="input-group-addon">
						                  <i class="fa fa-calendar"></i>
						                </div>
						                <input type="text" class="form-control"  id = 'dob' required name = "dob" readonly value = "<?php echo $row['d_o_b']?>">
						                
						              </div><!-- /.input group -->
						            </div>
						        </div>
						        <div class="form-group">
						          <label class="col-sm-4 control-label">Age </label>
						            <div class="col-sm-8">
						              <input type="text" class="form-control" name="age" id="age" required value = "<?php echo $row['age'] ?>" onkeypress="return isNumber(event)">
						            </div>
						        </div>
						        <div class="form-group">
						          <label class="col-sm-4 control-label">Religion</label>
						            <div class="col-sm-8">
						              <input type="text" class="form-control" name="religion" id="religion" required value = "<?php echo $row['religionName'] ?>" readonly>
						              <input type="hidden" name = 'religionID' value = "<?php echo $row['religionID'] ?>">
						            </div>
						        </div>
						        <div class="form-group">
						          <label class="col-sm-4 control-label">Nationality</label>
						            <div class="col-sm-8">
						              <input type="text" class="form-control" name="nationality" id="nationality" required value = "<?php echo $row['nationalityName'] ?>" readonly>
						              <input type="hidden" name = 'nationalityID' value = "<?php echo $row['nationalityID'] ?>">
						            </div>
						        </div>
						        <div class="form-group">
						          <label class="col-sm-4 control-label">Class</label>
						            <div class="col-sm-8">
						              <input type="text" class="form-control" name="class" id="class" required value = "<?php echo $row['className'] ?>" readonly>
						              <input type="hidden" name = 'classID' value = "<?php echo $row['classID'] ?>" id = 'classID'>
						            </div>
						        </div>
						        <div class="form-group">
					              <label for="divSelect" class = "col-sm-4 control-label">Select Division : </label>
					              	<div class="col-sm-8">
						                <select class = 'form-control divSelect' id = 'divSelect' name = 'divID'></select>
						                <span class = 'help-block' id = 'divSelectError' style = 'color : red'></span>
						            </div>
					            </div>

					            <div class="form-group">
					              <label for="houseSelect" class = "col-sm-4 control-label">House : </label>
					              	<div class="col-sm-8">
						                <select class = 'form-control houseSelect' id = 'houseSelect' name = 'houseID'></select>
						                <span class = 'help-block' id = 'houseSelectError' style = 'color : red'></span> 
						            </div>
					            </div>
					            
		                	</div> <!-- col div ends -->
		                	<div class="col-md-4">	
		                		<div class = 'row'>
		                			<img id="userImage" src="<?php echo $row['imagePath']?>" alt="User image" width = '120' height="150" class = 'img-responsive thumbnail pull-right' />
		                		</div>

		                	</div>
		                </div>
		              </div>     
		              
		            </div><!-- /.tab-pane -->
		            <div class="tab-pane" id="education">
		              <div class = 'box-body'>
		                <div class="row" style="margin-top : 30px">
		                	<div class="form-group">
						     	<label class="col-sm-4 control-label">Previous School</label>
						        <div class="col-sm-8">
						        	<input type="text" class="form-control" name="previousSchool" id="previousSchool">
						        	<span class = 'help-block' id = 'previousSchoolError' style = 'color : red'></span>
						        </div>
						    </div>
						    <div class="form-group">
					          <label for="documentDate" class="col-sm-4 control-label">Document Date</label>
					            <div class="col-sm-8">
					              <div class="input-group">
					                <div class="input-group-addon">
					                  <i class="fa fa-calendar"></i>
					                </div>
					                <input type="date" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="" id = 'documentDate' required name = "documentDate">
					                <span class = 'help-block' style = 'color : red' id = 'documentDateErr'></span>
					              </div><!-- /.input group -->
					            </div>
					        </div>
					        <div class="form-group">
						    	<label class="col-sm-4 control-label">Class Last Passed</label>
						        <div class="col-sm-8">
						        	<input type="text" class="form-control" name="lastPassed" id="lastPassed" required value = "<?php echo $row['lastPassed'] ?>" readonly>
						        </div>
						    </div>
						    <div class="form-group">
						    	<label class="col-sm-4 control-label">Year of Passing</label>
						        <div class="col-sm-8">
						        	<input type="text" class="form-control" name="yearOfPassing" id="yearOfPassing" required value = "<?php echo $row['yearOfPassing'] ?>" readonly>
						        </div>
						    </div>
						    <div class="form-group">
						    	<label class="col-sm-4 control-label">Reason for leaving School</label>
						        <div class="col-sm-8">
						        	<input type="text" class="form-control" name="reason" id="reason">
						        	<span class = 'help-block' id = 'reasonError' style = 'color : red'></span>
						        </div>
						    </div>
						    <div class="form-group">
						    	
						    	<label class="col-sm-4 control-label">Was the last school attended recognised ?</label>
						    	
						    	
							        <div class="col-sm-8">
						              <label>
						                <input type="radio" name="recognised" class="minimal" value="y">
						                &nbsp; Yes &nbsp;&nbsp;
						              </label>
						              <label>
						                <input type="radio" name="recognised" class="minimal" value="n">
						                &nbsp; No &nbsp;&nbsp;
						              </label>
						            </div>

						    </div>
						    <div class="form-group">
						    	
						    	<label class="col-sm-4 control-label">Has the Student ever been expelled / not promoted to next class by any school ?</label>
						    	
						    	
							        <div class="col-sm-8">
						              <label>
						                <input type="radio" name="isExpelled" class="minimal" value="y">
						                &nbsp; Yes &nbsp;&nbsp;
						              </label>
						              <label>
						                <input type="radio" name="isExpelled" class="minimal" value="n">
						                &nbsp; No &nbsp;&nbsp;
						              </label>
						            </div>

						    </div>
						    <div class="form-group">
						    	
						    	<label class="col-sm-4 control-label">Is Transfer Ceritificate Available ?</label>
						    	
						    	
							        <div class="col-sm-8">
						              <label>
						                <input type="radio" name="tc" class="minimal" value="y">
						                &nbsp; Yes &nbsp;&nbsp;
						              </label>
						              <label>
						                <input type="radio" name="tc" class="minimal" value="n">
						                &nbsp; No &nbsp;&nbsp;
						              </label>
						            </div>

						    </div>
						    
						    

		                </div>
		              </div>     
		            </div><!-- /.tab-pane -->
		            <div class="tab-pane" id="parents">
		              	<div class = 'box-body'>
		              		<div class="row">
		              			<h4> Father's Details </h4>
		              		</div>
		                	<div class="row" style="margin-top : 10px">
		                			<div class="form-group">
						     			<label class="col-sm-4 control-label">Father's Name</label>
						        		<div class="col-sm-8">
						        			<div class="input-group">
					                			<div class="input-group-addon">
					                  			<span>Mr. </span>
					                			</div>
					                			<input type="text" class="form-control" id = 'fatherName' required name = "fatherName" value = "<?php echo $row['fatherName']?>" readonly>
					                	
					              			</div><!-- /.input group -->
						        	
						        		</div>
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Education</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'fatherEducation' required name = "fatherEducation">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Occupation</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'fatherOccupation' required name = "fatherOccupation">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Work Address</label>
						        		<div class="col-sm-8">
						    				<textarea id = 'fatherWorkAddress' name = 'fatherWorkAddress' rows="3" class="form-control"></textarea>
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Contact</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'fatherContact' required name = "fatherContact">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">City</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'fatherCity' required name = "fatherCity">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">State</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'fatherState' required name = "fatherState">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Mobile</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'fatherMobile' required name = "fatherMobile">
					            		</div>
						        	
						    		</div>
							</div>
							<div class="row">
		              			<h4> Mother's Details </h4>
		              		</div>
		                	<div class="row" style="margin-top : 10px">
		                			<div class="form-group">
						     			<label class="col-sm-4 control-label">Mother's Name</label>
						        		<div class="col-sm-8">
						        			<div class="input-group">
					                			<div class="input-group-addon">
					                  			<span>Mrs. </span>
					                			</div>
					                			<input type="text" class="form-control" id = 'motherName' required name = "motherName" value = "<?php echo $row['motherName']?>" readonly>
					                	
					              			</div><!-- /.input group -->
						        	
						        		</div>
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Education</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'motherEducation' required name = "motherEducation">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Occupation</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'motherOccupation' required name = "motherOccupation">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Work Address</label>
						        		<div class="col-sm-8">
						    				<textarea id = 'motherWorkAddress' name = 'motherWorkAddress' rows="3" class="form-control"></textarea>
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Contact</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'motherContact' required name = "motherContact">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">City</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'motherCity' required name = "motherCity">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">State</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'motherState' required name = "motherState">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Mobile</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'motherMobile' required name = "motherMobile">
					            		</div>
						        	
						    		</div>
							</div>
					  		<div class="row">
		              			<h4> Guardian's Details </h4>
		              		</div>
		                	<div class="row" style="margin-top : 10px">
		                			<div class="form-group">
						     			<label class="col-sm-4 control-label">Guardian's Name</label>
						        		<div class="col-sm-8">
						        			<div class="input-group">
					                			<div class="input-group-addon">
					                  			<span>Mr. </span>
					                			</div>
					                			<input type="text" class="form-control" id = 'guardianName' required name = "guardianName">
					                	
					              			</div><!-- /.input group -->
						        	
						        		</div>
						    		</div>
						    		
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Address</label>
						        		<div class="col-sm-8">
						    				<textarea id = 'guardianAddress' name = 'guardianAddress' rows="3" class="form-control"></textarea>
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Contact</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'guardianContact' required name = "guardianContact">
					            		</div>
						        	
						    		</div>

							</div>
					  	
					  	</div> <!-- box body -->
		            
		            </div><!-- /.tab-pane -->
		            <div class="tab-pane" id="address">
		              <div class = 'box-body'>
		                	<div class="row">
		              			<h4> Present Address </h4>
		              		</div>
		                	<div class="row" style="margin-top : 10px">
		                			<div class="form-group">
						     			<label class="col-sm-4 control-label">Address</label>
						        		<div class="col-sm-8">
						        			<textarea id = 'presentAddress' name = 'presentAddress' class="form-control"><?php echo $row['address'] ?></textarea>	
						        		</div>
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">City</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'presentCity' name = "presentCity">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">State</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'presentState' name = "presentState">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Pin Code</label>
						        		<div class="col-sm-8">
						    				<input type = 'text' class="form-control" id = "presentPinCode" name = "presentPinCode">
					            		</div>
						        	
						    		</div>
						    		
							</div>
						
							<div class="row">
		              			<h4> Permanent Address </h4>
		              		</div>
		              		<div class="row">
		            	  		<div class="checkbox icheck">
					                <label>
					                  	<input type="checkbox" id = 'permAddressDiv'> &nbsp; <strong> Same as Present Address </strong>
					                </label>
					            </div>
		              			
		              		</div>
		              		<div id = 'permAddress'>	
		                		<div class="row" style="margin-top : 10px">
		                			<div class="form-group">
						     			<label class="col-sm-4 control-label">Address</label>
						        		<div class="col-sm-8">
						        			<textarea id = 'permanentAddress' name = 'permanentAddress' class="form-control"></textarea>	
						        		</div>
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">City</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'permanentCity' name = "permanentCity">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">State</label>
						        		<div class="col-sm-8">
						    				<input type="text" class="form-control" id = 'permanentState' name = "permanentState">
					            		</div>
						        	
						    		</div>
						    		<div class="form-group">
						     			<label class="col-sm-4 control-label">Pin Code</label>
						        		<div class="col-sm-8">
						    				<input type = 'text' class="form-control" id = "permanentPinCode" name = "permanentPinCode">
					            		</div>
						        	
						    		</div>
						    		
								</div>
							</div> <!-- #permAddress -->
		              </div> <!-- .box-body -->    
		            </div><!-- /.tab-pane -->
		            <div class="tab-pane" id="conveyance">
		              <div class = 'box-body'>
		                	<div class="row">
		              			<h4> Conveyance Details </h4>
		              		</div>

		              		<div class="row">
		            	  		<div class="checkbox icheck">
					                <label>
					                  	<input type="checkbox" id = 'pickUpPointDiv' value = 'y' name = 'transport'> &nbsp; <strong> Do you want to avail transport facility ? </strong>
					                </label>
					            </div>
		              			
		              		</div>
		                	<div class="row" style="margin-top : 10px ; display: none" id = 'pickUpPoint'>
		                		<div class="form-group">
		                			<label class="col-sm-4 control-label">Pick up point : </label>
						        	<div class="col-sm-8">
						    			<select name = "pickUpPoint" id = "pickUpSelect" onchange="loadCharges(this.value)" class="form-control pickUpSelect"></select>
					            	</div>			
		                		</div>
		                		<div class="form-group">
							     	<label class="col-sm-4 control-label">Charges : </label>
							        <div class="col-sm-8">
							    		<input type = 'text' class="form-control" id = "charges" name = "charges">
						            </div>
						    	</div>
		                	</div>
		                	
		              </div>     
		            </div><!-- /.tab-pane -->
		            <div class="tab-pane" id="medical">
		              <div class = 'box-body'>
		                <div class="form-group">
						    <label class="col-sm-4 control-label">Height (in cms)</label>
						    <div class="col-sm-8">
						    	<input type="text" class="form-control" id = 'height' name = "height" onkeypress="return isNumber(event)">
					        </div>
						        	
						</div>

						<div class="form-group">
						    <label class="col-sm-4 control-label">Weight (in Kg)</label>
						    <div class="col-sm-8">
						    	<input type="text" class="form-control" id = 'weight' name = "weight" onkeypress="return isNumber(event)">
					        </div>
						        	
						</div>

						<div class="form-group">
						    <label class="col-sm-4 control-label">Blood Group</label>
						    <div class="col-sm-8">
						    	<input type="text" class="form-control" id = 'blood' name = "blood">
					        </div>
						        	
						</div>

						<div class="form-group">
						    <label class="col-sm-4 control-label"> Vision </label>
						    <div class="col-sm-4">
						    	<label class="col-sm-2 control-label">
						        	(L) &nbsp; 
						        </label>
						        <div class="col-sm-10">
						    		<input type="text" class="form-control" id = 'vision_l' name = "vision_l">
						    	</div>
					        </div>
					        <div class="col-sm-4">
					        	<label class="col-sm-2 control-label">
						        	(R) &nbsp; 
						        </label>
						        <div class="col-sm-10">
						    		<input type="text" class="form-control" id = 'vision_r' name = "vision_r">
						    	</div>
					        </div>
					    </div>    
					        <div class="form-group">
						    	
						    	<label class="col-sm-4 control-label">Is the child allergic to something ?</label>
						    	
						    	
							        <div class="col-sm-8">
						              <label>
						                <input type="radio" name="allergic" class="minimal" value="y">
						                &nbsp; Yes &nbsp;&nbsp;
						              </label>
						              <label>
						                <input type="radio" name="allergic" class="minimal" value="n">
						                &nbsp; No &nbsp;&nbsp;
						              </label>
						            </div>

						    </div>
		            	  	<div class="form-group">
							    <label class="col-sm-4 control-label">If yes, specify : </label>
							    <div class="col-sm-8">
							    	<input type="text" class="form-control" id = 'allergy' name = "allergy">
						        </div>
							        	
							</div>

							<div class="form-group">
							    <label class="col-sm-4 control-label">Any specific ailment ? </label>
							    <div class="col-sm-8">
							    	<input type="text" class="form-control" id = 'ailment' name = "ailment">
						        </div>
							        	
							</div>							
						        	
							
						
		              </div>     
		            </div><!-- /.tab-pane -->
		            
		        </div><!-- /.tab-content -->
		      </div><!-- nav-tabs-custom -->
		    </div> <!-- internal row -->  

		    
		  </div><!-- /.col -->
		</div> <!-- /.row -->
		
	</div>
</div>
</form>
<script src = 'assets/js/commonFunctions.js'></script>
<script src = 'assets/js/admin/registrationForm.js'></script>
