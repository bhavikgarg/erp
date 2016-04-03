<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<div class="row">
  <div class="col-md-8 col-md-offset-2">
    <div class = 'row'>
      <div class = 'col-md-8 col-md-offset-3'>
        <div id = 'message'></div>
      </div>
    </div>
    <div class="box box-info">
      <div class="box-header with-border">
        <h3 class="box-title">Assign Subjects to classes</h3>
      </div><!-- /.box-header -->
      
        <form role="form" id = 'assignSubjectForm'>
          <div class="box-body">
            <div class="form-group">
              <label for="grade">Select Grade : </label>
              <select class = 'form-control gradeSelect' id = 'gradeSelect' name = 'gradeID' onchange = 'loadDivision(this.value)'></select>
              <span class = 'help-block' id = 'gradeSelectError' style = 'color : red'></span>
            </div>
            <div class="form-group">
              <label for="divSelect">Select Division : </label>
                <select class = 'form-control divSelect' id = 'divSelect' name = 'divID'></select>
                <span class = 'help-block' id = 'divSelectError' style = 'color : red'></span>
            </div>
            <div class="form-group">
              <label for="subjectSelect">Select Subject : </label>
                <select class = 'form-control subjectSelect' id = 'subjectSelect' name = 'subjectID'></select>
                <span class = 'help-block' id = 'subjectSelectError' style = 'color : red'></span>
            </div>
            <div class="form-group">
              <label for="teacherSelect">Select Teacher : </label>
                <select class = 'form-control teacherSelect' id = 'teacherSelect' name = 'teacherID'></select>
                <span class = 'help-block' id = 'teacherSelectError' style = 'color : red'></span>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Score Type : </label>
              <div class="col-sm-10">
                <label>
                  <input type="radio" name="scoreType" class="minimal" value="grade">
                  &nbsp; Grade &nbsp;&nbsp;
                </label>
                <label>
                  <input type="radio" name="scoreType" class="minimal" value="marks">
                  &nbsp; Marks &nbsp;&nbsp;
                </label>
              </div>
              <span class = 'help-block' style = 'color : red' id = 'scoreTypeError'></span>
          </div>

        </div><!-- /.box-body -->

        <div class="box-footer">
          <button type="button" class="btn btn-success pull-right" id = 'assignSubjectBTN'><i class = 'fa fa-plus'></i>&nbsp; Assign</button>
          <button type="reset" class="btn btn-danger pull-left"><i class = 'fa fa-refresh fa-spin'></i>&nbsp; Reset</button>
        </div>

      </form>
      
    </div>
  </div> 
</div>     

<script src = 'assets/js/admin/assignSubjects.js'></script>