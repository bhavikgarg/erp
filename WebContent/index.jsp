<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<html>
<head>

	 <jsp:include page="commons/include/cssFiles.html"></jsp:include>
	  	
</head>

<body class="hold-transition login-page">
   <div class="login-box">
    <div id = 'errorMsg'>
    
       ${requestScope.message}
    
    </div>
      <div class="login-logo">
        <b>School</b>ERP
      </div><!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Sign in to start your session</p>
        <form id = 'loginForm'>
          <div class="form-group has-feedback">
            <input type="text" class="form-control" placeholder="Username" id = 'username' name="username">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            <span class = 'help-block' style = 'color : red' id = 'usernameError'></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" class="form-control" placeholder="**********" name="password" id = "password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            <span class = 'help-block' style = 'color : red' id = 'passwordError'></span>
          </div>
          <!-- <div class="form-group has-feedback">
            <select name = 'role' id = 'role' class = 'form-control'>
            	<option value = '-1'>-- Select Role --</option>
            	<option value = '2'>Teacher</option>
            	<option value = '1'>Student</option>
            </select>
            <span class = 'help-block' style = 'color : red' id = 'roleError'></span>
          </div> -->
          <br>
          
          <div class="row">
            <div class="col-xs-6">
              <div class="checkbox icheck">
                <label>
                  <input type="checkbox"> Remember Me
                </label>
              </div>
            </div><!-- /.col -->
            <div class="col-xs-6">
              <button type="button" class="btn btn-primary btn-block btn-flat" id = 'loginBTN'>Sign In</button>
            </div><!-- /.col -->
          </div>
        </form>

        <br>
        <br>

        <a href="#">I forgot my password</a><br>
      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->

	<!-- js for login page validation and ajax post -->
	
    
    <jsp:include page="commons/include/jsFiles.html"></jsp:include>
	<script src = "assets/js/loginJS.js" type="text/javascript"></script>
    
</body>
</html>