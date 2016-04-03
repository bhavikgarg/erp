/**
 * 
 */

$(document).ready(function(){
	
  $('#applicationTable').DataTable({
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      
  });

  



  $('#applicationTable').on('click','.selectForm', function() {       
    $('#selectedApplicationNo').val(this.value);
  });

  $('#proceedToRegisterBTN').on('click', function(){

    var val = $('#selectedApplicationNo').val();
    var formNumber = val.substring(0,11);
    var classID = val.substring(11);
    /*console.log("Form no  is : "+formNumber);
    console.log("Class ID is : "+classID);*/
    // getting the registration form
    $.ajax({
        url : 'adminModule/registrationForm.php?form='+formNumber,
        type : 'GET',
        beforeSend : function()
        {
          NProgress.start();
          NProgress.set(0.4);
        },
        success : function(data)
        {
          // console.log(data);
          $('.content').html(data);
        },
        error : function(err)
        {
          alert("Error in loading registration form..Try later");
        },
        complete : function()
        {
          NProgress.done();
        }
    });
          // get all divisions of the class
          if(classID != '' && classID.length > 0)
          {


            $.ajax({
                url : 'adminModule/process/getAllDivisions.php?classID='+classID,
                type : 'GET',
                beforeSend : function()
                {
                  NProgress.start();
                  NProgress.set(0.4);
                },
                success : function(d)
                {
                  var responseObj = JSON.parse(d);
                  var selectField = $('.divSelect');
                  selectField.empty();
                  var options = "<option value = '-1'>-- Select Division -- </option>";
                  $.each(responseObj, function(key, obj){
                    options += "<option value = '"+obj.divID+"'>"+obj.division+"</option>";
                  });
                  selectField.append(options);
                },
                error : function(err)
                {
                  alert("Could not fetch the divisions..Try again");
                },
                complete : function()
                {
                  NProgress.done();
                }
              });  
          }

  });
  
  
  
});  // document.ready ends 
