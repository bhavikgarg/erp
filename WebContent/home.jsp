<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<head>

	<jsp:include page="commons/include/cssFiles.html"></jsp:include>
	
</head>
<body class="hold-transition skin-blue sidebar-mini" id = "body" ng-app = 'erpApp'>


		<div class = "wrapper">

			<header class = "main-header">
				<a href="index2.html" class="logo">
	          		<!-- mini logo for sidebar mini 50x50 pixels -->
	          		<span class="logo-mini"><b>E</b>RP</span>
	          <!-- logo for regular state and mobile devices -->
	          		<span class="logo-lg"><b>School</b>ERP</span>
	        	</a>	

	        	<!-- 
					including top navbar 
	        	-->
	        	<jsp:include page="commons/include/topNavbar.jsp"></jsp:include>

			</header>
			<!-- sidebar -->
			<aside class = 'main-sidebar'>

				<jsp:include page="commons/include/leftNavbar.jsp"></jsp:include>

			</aside>

			<div class = 'content-wrapper'>
				

	        	<section class = 'content' ui-view>
					
					<div id="glyphicons">
	                    <ul class="bs-glyphicons">
	                      <li>
	                        <span class="fa fa-home fa-3x"></span>
	                        <span class="glyphicon-class">Home</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-cogs fa-3x"></span>
	                        <span class="glyphicon-class">Settings</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-user fa-3x"></span>
	                        <span class="glyphicon-class">Student</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-users fa-3x"></span>
	                        <span class="glyphicon-class">Human Resource</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-tasks fa-3x"></span>
	                        <span class="glyphicon-class">Time Table</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-edit fa-3x"></span>
	                        <span class="glyphicon-class">Exams</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-book fa-3x"></span>
	                        <span class="glyphicon-class">Library</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-bus fa-3x"></span>
	                        <span class="glyphicon-class">Transport</span>
	                      </li>
	                      <li>
	                        <span class="fa fa-pencil fa-3x"></span>
	                        <span class="glyphicon-class">Assignment</span>
	                      </li>
                    </ul>
                   </div>   


                   
	
	        	  <div class="row">
		            <div class="col-md-3 col-sm-6 col-xs-12">
		              <div class="info-box">
		                <span class="info-box-icon bg-aqua"><i class="fa fa-users"></i></span>
		                <div class="info-box-content">
		                  <span class="info-box-text">Total Students</span>
		                  <span class="info-box-number">2</span>
		                </div><!-- /.info-box-content -->
		              </div><!-- /.info-box -->
		            </div><!-- /.col -->
		            <div class="col-md-3 col-sm-6 col-xs-12">
		              <div class="info-box">
		                <span class="info-box-icon bg-green"><i class="fa fa-flag-o"></i></span>
		                <div class="info-box-content">
		                  <span class="info-box-text">Total Employees</span>
		                  <span class="info-box-number">10</span>
		                </div><!-- /.info-box-content -->
		              </div><!-- /.info-box -->
		            </div><!-- /.col -->
		            <div class="col-md-3 col-sm-6 col-xs-12">
		              <div class="info-box">
		                <span class="info-box-icon bg-yellow"><i class="fa fa-files-o"></i></span>
		                <div class="info-box-content">
		                  <span class="info-box-text"></span>
		                  <span class="info-box-number"></span>
		                </div><!-- /.info-box-content -->
		              </div><!-- /.info-box -->
		            </div><!-- /.col -->
		            <div class="col-md-3 col-sm-6 col-xs-12">
		              <div class="info-box">
		                <span class="info-box-icon bg-red"><i class="fa fa-star-o"></i></span>
		                <div class="info-box-content">
		                  <span class="info-box-text"></span>
		                  <span class="info-box-number"></span>
		                </div><!-- /.info-box-content -->
		              </div><!-- /.info-box -->
		            </div><!-- /.col -->
		          </div><!-- /.row -->

				<!-- calendar code starts -->		          
				<br>
					<div class="row">
			            <div class="col-md-3">
			              <div class="box box-solid">
			                <div class="box-header with-border">
			                  <h4 class="box-title">Drag Events to Calendar</h4>
			                </div>
			                <div class="box-body">
			                  <!-- the events -->
			                  <div class="row">
			                   <div id='external-events'>
									
									<div class='fc-event bg-green'>
										<center>New Event</center>
									</div>
									
									<div id="trash">
										<center>Drop events here to delete </center>
									</div>
									
								</div>
			                  </div>

			                  
			                </div><!-- /.box-body -->
			              </div><!-- /. box -->
			              
			            </div><!-- /.col 3 -->
			            <div class="col-md-9">
			              <div class="box box-primary">
			                <div class="box-body no-padding">
			                  <!-- THE CALENDAR -->
			                  <div id="calendar"></div>
			                </div><!-- /.box-body -->
			              </div><!-- /. box -->
			            </div><!-- /.col -->
			          </div><!-- /.row -->
	        		

	        		<!-- calendar code ends -->
	        		<!-- modal code starts -->
	        	<input type = 'hidden' id = 'eventName'>	
	        	<input type = 'hidden' id = 'eID'>
	        	<div id="eventModal" class="modal fade" role="dialog">
	        		<form id = 'createEventForm'>
				        <div class="modal-dialog">
				            <div class="modal-content">
				                <div class="modal-header">
				                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				                    <h4 class="modal-title">Create New Event</h4>
				                </div>
				                <div class="modal-body">

				                      <div class = "row">

				                          <div class = "col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 col-lg-10 col-lg-offset-1 col-sm-10 col-sm-offset-1">

				                              <!-- form starts -->

				                                  <div class="box-body">
				                                      
				                                    <label for="eventTitle">Event Title</label>
				                                    <input type="text" class="form-control" id="eventTitle" name = "title">
				                                     
								            	  		<div class="checkbox icheck">
											                <label>
											                  	<input type="checkbox" id = 'emailDivControl' value = 'setReminder'> &nbsp; <strong> Send Reminder Mail</strong>
											                </label>
											            </div>
								              			
								              		
				                                      <div class="form-group" id = 'emailDiv' style = 'display : none'>
				                                          <label for="email"> Email </label>
				                                          <input type="email" class="form-control" id="email" name = "email">
				                                          <span class = 'help-block'>Specify the email of person</span>
				                                          <span class = "help-block field" id = "emailError" style = "color : red"></span>

				                                          <label for = 'msg'> Message </label>
				                                          <textarea name = 'message' class="form-control" id = 'message' rows = "2"></textarea>
				                                          <span class="help-block" style = 'color : red' id = 'msgErr'></span>
				                                      </div>



				                                  </div><!-- /.box-body -->


				                              <!--</form>-->
				                          </div>
				                      </div>  <!-- row for form ends -->

				                </div>
				                <div class="modal-footer">
				                    <!-- data-toggle="modal" data-target="#surveyModal3" -->
				                    <button type="button" class="btn btn-info pull-right" id = "eventBTN"><i class = "fa fa-plus"></i> &nbsp;Create Event </button>

				                </div>
				            </div><!-- /.modal-content -->
				        </div><!-- /.modal-dialog -->
				      </form>  
				    </div>

				    <!-- modal code ends -->


				<!-- calendar code ends -->
	        	</section>  <!-- .content -->


			</div> <!-- .content-wrapper -->

			<footer class="main-footer">
	        	<div class="pull-right hidden-xs">
	          		<b>Version</b> 2.3.0
	        	</div>
	        	<strong>Copyright &copy; 2014-2015 <a href="">Bhavik Garg</a>.</strong> All rights reserved.
	      	</footer>

	      	<!-- right sidebar -->

	      	<aside class="control-sidebar control-sidebar-dark">
	      		<jsp:include page="commons/include/rightNavbar.jsp"></jsp:include>
	      	</aside>
	      	<!-- Add the sidebar's background. This div must be placed
	           immediately after the control sidebar -->
	      	<div class="control-sidebar-bg"></div>
	</div> <!-- .wrapper ends -->


<!-- including the js files -->

<jsp:include page="commons/include/jsFiles.html"></jsp:include>
<script type="text/javascript" src = "assets/js/homePage.js"></script>
</body>
</html>

    