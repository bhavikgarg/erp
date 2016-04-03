<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div id="message" class="col-sm-12"> 
            <!-- This div is for taking error messages -->
</div>


<div class="box box-info">
    <div class="box-header with-border">
        <h3 class="box-title">Upload Assignment</h3>
        
    </div><!-- /.box-header -->
    <!-- form start -->
    <form class="form-horizontal" id = 'assignmentForm'>
      <div class="box-body">
      	<br><br>
        
					
		<div class="form-group">
          <label for="grade" class="col-sm-2 control-label">Class : </label>
          <div class="col-sm-4">
              <select name = 'grade' id = 'grade' required class = 'form-control'>
              <!-- to be filled in dynamically -->
              </select>
              <span class = 'help-block' style = 'color : red' id = 'gradeError'></span>
          </div>
          <label for="division" class="col-sm-2 control-label">Division :  </label>
          <div class="col-sm-4">
            <!-- multiple select  -->
              <select class="form-control select2" multiple="multiple" data-placeholder="Select Division">
                <!-- to be filled in dynamically -->      
              </select>
              
          </div>
        </div>
        
        <div class="form-group">
          <label for="grade" class="col-sm-2 control-label">Subject : </label>
          <div class="col-sm-4">
              <select name = 'subject' id = 'subject' required class = 'form-control'>
              <!-- to be filled in dynamically -->
              </select>
              <span class = 'help-block' style = 'color : red' id = 'subjectError'></span>
          </div>
          <label for="date" class="col-sm-2 control-label">Submission Date :  </label>
          <div class="col-sm-4">
            <div class="input-group">
                <div class="input-group-addon">
                  <i class="fa fa-calendar"></i>
                </div>
                <input type="date" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="" id = 'submissionDate' required name = "submissionDate">
                <span class = 'help-block' style = 'color : red' id = 'submissionDateError'></span>
              </div><!-- /.input group -->
          </div>
        </div>
        
        <div class="form-group">
          <label for="description" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea name = 'description' id = 'description' class = "form-control"></textarea>
            <span class = 'help-block' style = 'color : red' id = 'descriptionError'></span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="file" class="col-sm-2 control-label">Upload File</label>
          <div class="col-sm-10">
            <input type = 'file' name = 'file' id = 'file' class = 'form-control'>
            <span class = 'help-block' style = 'color : red' id = 'fileError'></span>
          </div>
        </div>
        
        <div class = 'row'>
        	<div class = 'col-md-12'>
        		<center><strong> OR </strong></center>
        	</div>
        </div>
        
        <div class = 'row'>
        	<br><br>
        	<!-- embed CKEDITOR -->
        	<div class="col-sm-10 col-sm-offset-1">	
        		<textarea id="editor" name="editor"  class = 'ckeditor'></textarea>
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

<script type = 'text/javascript' src = 'assets/js/academic/assignment.js'></script>
<script src = 'assets/ckeditor/ckeditor.js'></script>
