/**
 * 
 */

$(document).ready(function(){
	
	$("input").on('focus', function(){
	   $("input").css('border','1px solid #d2d6de');
	   $('span[id*="Error"]').html("");
	});
	
	var t = $('#designationTable').DataTable({
	      "paging": true,
	      "lengthChange": true,
	      "searching": true,
	      "ordering": true,
	      "info": true,
	      
	});
	
	// get all designation data
	$.ajax({
		url : 'adminCRUD?section=designation&action=listAll',
		type : 'GET',
		success : function(data)
		{
			console.log("The data obtained is : "+data);
			var responseObj = JSON.parse(data);
			
			
			$.each(responseObj, function(key, obj){
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
								"<a role='menuitem' tabindex='-1' href='#' onclick = deleteDesignation('"+obj.id+"')>" +
									"<i class = 'fa fa-trash-o' style = 'color : red'></i> &nbsp; Delete " +
								"</a>" +
							"</li>"+
						"</ul>" +
					"</div>";
				
				
				t.row.add([
				
				    obj.id,
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
	
	// perform on click of Add Designation button
	$('#addDesignationBTN').on('click', function(){
		
		var designationName = $('#designation').val();
		if(checkEmpty(designationName))
		{
			var frm = $('#newDesignationForm');
			// send to server
			$.ajax({
				url : 'adminCRUD?section=designation&action=add',
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
						$('#religion').val("");
						
					}
					else
					{
						
						var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
						$('#message').html(content);					
						
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						$('#religion').val("");
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
			$('#designationError').html("* Required");
			$('#designation').css("border", "1px dashed red");
		}
		
		
	});
	
	// update religion after edit
	$('#saveEdited').on('click', function(){
		var id = $('#designationID').val();
		var designationName = $('#designationEdit').val();
		if(checkEmpty(designationName))
		{


		$.ajax({
			url : 'adminCRUD?section=designation&action=edit&id='+id+'&name='+designationName,
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
			$('#designationEditError').html("* Required");
		}
	});
	
	
	
	
}); // document.ready ends


//designation actions

function activate(designationID)
{
	console.log("ID to activate : "+designationID);
	$.ajax({
		url : 'adminCRUD?section=designation&action=activate&id='+designationID,
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

function inactivate(designationID)
{
	console.log("ID to inactivate : "+designationID);
	$.ajax({
		url : 'adminCRUD?section=designation&action=inactivate&id='+designationID,
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

function deleteDesignation(designationID)
{
	console.log("ID to delete : "+designationID);
	$.ajax({
		url : 'adminCRUD?section=designation&action=del&id='+designationID,
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

function edit(designationID, designationName)
{
	console.log("ID to edit : "+designationID+" name : "+designationName);
	$('#designationID').val(designationID);
	$('#designationEdit').val(designationName);
}