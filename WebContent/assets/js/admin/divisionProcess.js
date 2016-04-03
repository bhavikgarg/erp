/**
 * 
 */

$(document).ready(function(){
	
	$("input , select").on('focus', function(){
	   $(this).css('border','1px solid #d2d6de');
	   $('span[id*="Error"]').html("");
	});
	
	
	
	
	// load all classes
	
	$.ajax({
		url : 'selectBoxData?section=class',
		type : 'GET',
		success : function(data)
		{
			var responseObj = JSON.parse(data);
			var selectField = $('.gradeSelect');
			selectField.empty();
			var options = "<option value = '-1'>-- Select Grade -- </option>";
			$.each(responseObj, function(key, obj){
				options += "<option value = '"+obj.id+"'>"+obj.name+"</option>";
			});
			selectField.append(options);
			
		},
		error : function(err)
		{
			alert("Internal Server error..Could not fetch the classes");
		}
	});

	
	// perform on click of Add Class button
	$('#addDivisionBTN').on('click', function(){
		
		var classID = $('#gradeSelect').val();
		var division = $('#division').val();
		if(classID != '-1'){
		
			if(checkEmpty(division)){
				
				var frm = $('#newDivForm');
				// send to server
				$.ajax({
					url : 'adminCRUD?section=division&action=add',
					type : 'POST',
					data : frm.serialize(),
					beforeSend : function()
					{
						NProgress.start();
					},
					success : function(data)
					{
						var response = JSON.parse(data);
						if(response.error)
						{
							
							var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";
							$('#message').html(content);					
							setTimeout(function() {
	   							 $('#message').fadeOut('fast');
							}, 1000);
							$('#gradeSelect').val("-1");
							$('input').val("");
							
							
						}
						else
						{
							
							var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
							$('#message').html(content);					
							
							setTimeout(function() {
	   							 $('#message').fadeOut('fast');
							}, 1000);
							$('#gradeSelect').val("-1");
							$('input').val("");
						}
						
						// refresh the page
						
					},
					error : function(err)
					{
						alert("Internal Server Error");
					},
					complete : function()
					{
						NProgress.done();
					}
				});
			}
			else
			{
				$('#divisionError').html("* Required");
				$('#division').css("border", "1px dashed red");
			}
		}	
		else
		{
			$('#gradeSelectError').html("* Required");
			$('#gradeSelect').css("border", "1px dashed red");
		}
				
		
	});
	
	// update division after edit
	$('#saveEdited').on('click', function(){
		var id = $('#divID').val();
		var divName = $('#divEdit').val();
		if(checkEmpty(divName))
		{


		$.ajax({
			url : 'adminCRUD?section=division&action=edit&id='+id+'&name='+divName,
			type : 'GET',
			beforeSend : function()
			{
				NProgress.start();
				NProgress.set(0.4);
			},
			success : function(data)
			{
				console.log(data);
				var response = JSON.parse(data);
				if(response.error)
				{
						
						var content = "<div class = 'callout callout-danger col-md-12'><center>"+response.message+"</center></div>";
						$('#editFooter').html(content);					
						setTimeout(function() {
   							 $('#editFooter').fadeOut('fast');
   							 $('#editModal').modal("hide");
						}, 1000);
						
						
				}
				else
				{
						
						var content = "<div class = 'callout callout-success col-md-12'><center>"+response.message+"</center></div>";	
						$('#editFooter').html(content);					
						
						setTimeout(function() {
   							 $('#editFooter').fadeOut('fast');
   							 $('#editModal').modal("hide");
						}, 1000);
						
				}
				// reloading the page
				setTimeout(function(){
					window.location.reload();
				}, 100);	
				
			},
			error : function(err)
			{
				$('#editFooter').html("Internal Server Error...");
				setTimeout(function(){
					$('#editModal').modal("hide");
				}, 1000);
			},
			complete : function()
			{
				NProgress.done();
			}
		});
		}
		else
		{
			$('#divEditError').html("* Required");
		}
	});
	
		
});  // document.ready ends here

function activate(divID)
{
	console.log("ID to activate : "+divID);
	$.ajax({
		url : 'adminCRUD?section=division&action=activate&id='+divID,
		type : 'GET',
		beforeSend : function()
		{
			NProgress.start();
			NProgress.set(0.4);
		},
		success : function(data)
		{
				console.log(data);
					var response = JSON.parse(data);
					if(response.error)
					{
						
						var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";
						$('#message').html(content);					
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						
						
					}
					else
					{
						
						var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
						$('#message').html(content);					
						
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						
					}
				// reloading the page
				setTimeout(function(){
					window.location.reload();
				}, 100);	
				

		},
		error : function(data)
		{
			alert("Internal server error..Try later");
		},
		complete : function()
		{
			NProgress.done();
		}
	});
}

function inactivate(divID)
{
	console.log("ID to inactivate : "+divID);
	$.ajax({
		url : 'adminCRUD?section=division&action=inactivate&id='+divID,
		type : 'GET',
		beforeSend : function()
		{
			NProgress.start();
			NProgress.set(0.4);
		},
		success : function(data)
		{
			console.log(data);
					var response = JSON.parse(data);
					if(response.error)
					{
						
						var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";
						$('#message').html(content);					
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						
						
					}
					else
					{
						
						var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
						$('#message').html(content);					
						
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						
					}
					
					// reloading the page
					setTimeout(function(){
						window.location.reload();
					}, 100);	

		},
		error : function(data)
		{
			alert("Internal server error..Try later");
		},
		complete : function()
		{
			NProgress.done();
		}
	});
}

function deleteDiv(divID)
{
	console.log("ID to delete : "+divID);
	$.ajax({
		url : 'adminCRUD?section=division&action=del&id='+divID,
		type : 'GET',
		beforeSend : function()
		{
			NProgress.start();
			NProgress.set(0.4);
		},
		success : function(data)
		{
			console.log(data);
					var response = JSON.parse(data);
					if(response.error)
					{
						
						var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";
						$('#message').html(content);					
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						
						
					}
					else
					{
						
						var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
						$('#message').html(content);					
						
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						
					}
					// reloading the page
					setTimeout(function(){
						window.location.reload();
					}, 100);	
		},
		error : function(data)
		{
			alert("Internal server error..Try later");
		},
		complete : function()
		{
			NProgress.done();
		}
	});
}

function edit(divID, divName)
{
	console.log("ID to edit : "+divID+" name : "+divName);
	$('#divID').val(divID);
	$('#divEdit').val(divName);
}


t = $('#divTable').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    
});


function loadDivisions(classID){
	console.log("Class ID is : "+classID);
	count = 0;
	t.clear().draw();  // emptying the datatable every time 
	if(classID != '-1'){
		$.ajax({
			url : 'adminCRUD?section=division&action=listAll&classID='+classID,
			type : 'GET',
			success : function(data)
			{
				   
				if(data.length > 0 && data != null){
					
					console.log("The data obtained is : "+data);
					var responseObj = JSON.parse(data);
					$('#tableDiv').css("display","block");
					
					$.each(responseObj, function(key, obj){
						
						count += 1;
						
						var statusString = "<span style = 'color : red'>Inactive</span>";
						var statusAction = 
							"<li role='presentation'>" +
								"<a role='menuitem' tabindex='-1' href='#' onclick = activate('"+obj.id+"')>" +
									"<i class = 'fa fa-check' style = 'color : yellow'></i> &nbsp; Activate " +
								"</a>" +
							"</li>";
						
						if(obj.status)
						{
							var statusString = "<span style = 'color : green'>Active</span>";
							var statusAction = 
								"<li role='presentation'>" +
									"<a role='menuitem' tabindex='-1' href='#' onclick = inactivate('"+obj.id+"')>" +
										"<i class = 'fa fa-close' style = 'color : yellow'></i> &nbsp; Inactive " +
									"</a>" +
								"</li>";
						}
						var buttonString = 
							"<div class='dropdown'>" +
								"<button class='btn btn-warning dropdown-toggle' type='button' data-toggle='dropdown'>" +
									"<i class = 'fa fa-gears'></i>" +
								"</button>"+
								"<ul class='dropdown-menu'>"+
									"<li role='presentation'>" +
										"<a role='menuitem' tabindex='-1' href='#' onclick = edit('"+obj.id+"','"+obj.name+"') data-toggle='modal' data-target='#editModal'>" +
											"<i class = 'fa fa-edit' style = 'color : blue'></i> &nbsp; Edit " +
										"</a>" +
									"</li>"+
									statusAction+
									"<li role='presentation'>" +
										"<a role='menuitem' tabindex='-1' href='#' onclick = deleteDiv('"+obj.id+"')>" +
											"<i class = 'fa fa-trash-o' style = 'color : red'></i> &nbsp; Delete " +
										"</a>" +
									"</li>"+
								"</ul>" +
							"</div>";
						
						/*console.log("Id is : "+obj.id);
						console.log("Name is : "+obj.name);
						console.log("Status is : "+statusString);
						console.log("Button is : "+buttonString);
						console.log("t is : "+t); */
						
						t.row.add([
						
						    count,
						    obj.name,
						    statusString,
						    buttonString
						           
						]).draw(false); 
					});
				}
				else
				{
					$('#tableDiv').css("display","none");
					t.clear().draw();
					var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>There are no divisions in this class</center></div>";	
					$('#message').html(content);
				}
			},
			error : function(err)
			{
				alert("Error in fetching divisions");
			}
		});

	}	

}