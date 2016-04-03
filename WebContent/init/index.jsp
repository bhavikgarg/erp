<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<head>

	<jsp:include page="../commons/include/cssFiles.html"></jsp:include>
	
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
	        	<jsp:include page="../commons/include/topNavbar.jsp"></jsp:include>

			</header>
			<!-- sidebar -->
			<aside class = 'main-sidebar'>

				<jsp:include page="../commons/include/leftNavbar.jsp"></jsp:include>

			</aside>

			<div class = 'content-wrapper'>
				

	        	<section class = 'content'>
					<div ui-view></div>
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
	      		<jsp:include page="../commons/include/rightNavbar.jsp"></jsp:include>
	      	</aside>
	      	<!-- Add the sidebar's background. This div must be placed
	           immediately after the control sidebar -->
	      	<div class="control-sidebar-bg"></div>
	</div> <!-- .wrapper ends -->


<!-- including the js files -->

<jsp:include page="../commons/include/jsFiles.html"></jsp:include>

</body>
</html>

    