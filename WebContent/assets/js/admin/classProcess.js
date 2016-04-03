/**
 * 
 */

$(document).ready(function(){
	
	$("input").on('focus', function(){
	   $("input").css('border','1px solid #d2d6de');
	   $('span[id*="Error"]').html("");
	});
	
	var t = $('#classTable').DataTable({
	      "paging": true,
	      "lengthChange": true,
	      "searching": true,
	      "ordering": true,
	      "info": true,
	      
	});
	
	// get all class data
	$.ajax({
		url : 'adminCRUD?section=class&action=listAll',
		type : 'GET',
		success : function(data)
		{
			console.log("The data obtained is : "+data);
			var responseObj = JSON.parse(data);
			
			count = 0;
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
								"<a role='menuitem' tabindex='-1' href='#' onclick = deleteClass('"+obj.id+"')>" +
									"<i class = 'fa fa-trash-o' style = 'color : red'></i> &nbsp; Delete " +
								"</a>" +
							"</li>"+
						"</ul>" +
					"</div>";
				
				
				t.row.add([
				
				    count,
				    obj.name,
				    statusString,
				    buttonString
				           
				]).draw(false);
			});
			
			
		},
		error : function(err)
		{
			alert("Unable to fetch class data..Internal Server Error");
		}
	});
	
	// perform on click of Add Class button
	$('#addClass').on('click', function(){
		
		var className = $('#grade').val();
		if(checkEmpty(className))
		{
			var frm = $('#newClassForm');
			// send to server
			$.ajax({
				url : 'adminCRUD?section=class&action=add',
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
						$('#grade').val("");
						
					}
					else
					{
						
						var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
						$('#message').html(content);					
						
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						$('#grade').val("");
					}
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
			$('#gradeError').html("* Required");
			$('#grade').css("border", "1px dashed red");
		}
		
		
	});
	
	// update class after edit
	$('#saveEdited').on('click', function(){
		var id = $('#gradeID').val();
		var className = $('#gradeEdit').val();
		if(className.length > 0)
		{


		$.ajax({
			url : 'adminCRUD?section=class&action=edit&id='+id+'&name='+className,
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
			$('#gradeEditError').html("* Required");
		}
	});
	
	
	
	
}); // document.ready ends


//class actions

function activate(classID)
{
	console.log("ID to activate : "+classID);
	$.ajax({
		url : 'adminCRUD?section=class&action=activate&id='+classID,
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

function inactivate(classID)
{
	console.log("ID to inactivate : "+classID);
	$.ajax({
		url : 'adminCRUD?section=class&action=inactivate&id='+classID,
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

function deleteClass(classID)
{
	console.log("ID to delete : "+classID);
	$.ajax({
		url : 'adminCRUD?section=class&action=del&id='+classID,
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

function edit(classID, className)
{
	console.log("ID to edit : "+classID+" name : "+className);
	$('#gradeID').val(classID);
	$('#gradeEdit').val(className);
}