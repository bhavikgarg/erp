/**
 * 
 */

$(document).ready(function(){
	
	$("input").on('focus', function(){
	   $("input").css('border','1px solid #d2d6de');
	   $('span[id*="Error"]').html("");
	});
	
	var t = $('#nationalityTable').DataTable({
	      "paging": true,
	      "lengthChange": true,
	      "searching": true,
	      "ordering": true,
	      "info": true,
	      
	});
	
	// get all class data
	$.ajax({
		url : 'adminCRUD?section=nationality&action=listAll',
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
								"<a role='menuitem' tabindex='-1' href='#' onclick = deleteNationality('"+obj.id+"')>" +
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
	
	// perform on click of Add nationality button
	$('#addNationalityBTN').on('click', function(){
		
		var nationalityName = $('#nationality').val();
		if(checkEmpty(nationalityName))
		{
			var frm = $('#newNationalityForm');
			// send to server
			$.ajax({
				url : 'adminCRUD?section=nationality&action=add',
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
						$('#nationality').val("");
						
					}
					else
					{
						
						var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
						$('#message').html(content);					
						
						setTimeout(function() {
   							 $('#message').fadeOut('fast');
						}, 1000);
						$('#nationality').val("");
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
			$('#nationalityError').html("* Required");
			$('#nationality').css("border", "1px dashed red");
		}
		
		
	});
	
	// update nationality after edit
	$('#saveEdited').on('click', function(){
		var id = $('#nationalityID').val();
		var nationalityName = $('#nationalityEdit').val();
		if(checkEmpty(nationalityName))
		{


		$.ajax({
			url : 'adminCRUD?section=nationality&action=edit&id='+id+'&name='+nationalityName,
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
			$('#nationalityEditError').html("* Required");
		}
	});
	
	
	
	
}); // document.ready ends


//nationality actions

function activate(nationalityID)
{
	console.log("ID to activate : "+nationalityID);
	$.ajax({
		url : 'adminCRUD?section=nationality&action=activate&id='+nationalityID,
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

function inactivate(nationalityID)
{
	console.log("ID to inactivate : "+nationalityID);
	$.ajax({
		url : 'adminCRUD?section=nationality&action=inactivate&id='+nationalityID,
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

function deleteNationality(nationalityID)
{
	console.log("ID to delete : "+nationalityID);
	$.ajax({
		url : 'adminCRUD?section=nationality&action=del&id='+nationalityID,
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

function edit(nationalityID, nationalityName)
{
	console.log("ID to edit : "+nationalityID+" name : "+nationalityName);
	$('#nationalityID').val(nationalityID);
	$('#nationalityEdit').val(nationalityName);
}