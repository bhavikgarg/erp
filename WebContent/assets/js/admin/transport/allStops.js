/**
 * 
 */

$(document).ready(function(){
	
	$("input").on('focus', function(){
	   $("input").css('border','1px solid #d2d6de');
	   $('span[id*="Error"]').html("");
	});
	
	var t = $('#allStopTable').DataTable({
	      "paging": true,
	      "lengthChange": true,
	      "searching": true,
	      "ordering": true,
	      "info": true,
	      
	});
	
	// get all class data
	$.ajax({
		url : 'transportCtrl?action=listAll',
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
								"<a role='menuitem' tabindex='-1' href='#' onclick = edit('"+obj.id+"','"+obj.area+"','"+obj.city+"') data-toggle='modal' data-target='#editModal'>" +
									"<i class = 'fa fa-edit' style = 'color : blue'></i> &nbsp; Edit " +
								"</a>" +
							"</li>"+
							statusAction+
							"<li role='presentation'>" +
								"<a role='menuitem' tabindex='-1' href='#' onclick = deleteStop('"+obj.id+"')>" +
									"<i class = 'fa fa-trash-o' style = 'color : red'></i> &nbsp; Delete " +
								"</a>" +
							"</li>"+
						"</ul>" +
					"</div>";
				
				
				t.row.add([
				
				    count,
				    obj.area,
				    obj.city,
				    statusString,
				    buttonString
				           
				]).draw(false);
			});
			
			
		},
		error : function(err)
		{
			alert("Unable to fetch data..Internal Server Error");
		}
	});
	
	// perform on click of Add Stop button
	$('#addStopBTN').on('click', function(){
		
		var area = $('#area').val();
		var city = $('#city').val();
		if(checkEmpty(area))
		{
			if(checkEmpty(city))
			{
				
				
				var frm = $('#newStopForm');
				// send to server
				$.ajax({
					url : 'transportCtrl?action=add',
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
							$('input').val("");
							
						}
						else
						{
							
							var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+response.message+"</center></div>";	
							$('#message').html(content);					
							
							setTimeout(function() {
	   							 $('#message').fadeOut('fast');
							}, 1000);
							$('input').val("");
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
				$('#cityError').html("* Required");
				$('#city').css("border", "1px dashed red");
			}
		}
		else
		{
			$('#areaError').html("* Required");
			$('#area').css("border", "1px dashed red");
		}
		
		
	});
	
	// update class after edit
	$('#saveEdited').on('click', function(){
		var id = $('#id').val();
		var area = $('#areaEdit').val();
		var city = $('#cityEdit').val();
		if(checkEmpty(area))
		{
			if(checkEmpty(city))
			{
				
			
				$.ajax({
					url : 'transportCtrl?action=edit&id='+id+'&area='+area+'&city'+city,
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
				$('#cityEditError').html("* Required");
				$('#cityEdit').css("border","1px dashed red");
			}
		}
		else
		{
			$('#areaEditError').html("* Required");
			$('#areaEdit').css("border","1px dashed red");
		}
	});
	
	
	
	
}); // document.ready ends


//stops actions

function activate(id)
{
	console.log("ID to activate : "+id);
	$.ajax({
		url : 'transportCtrl?action=activate&id='+id,
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

function inactivate(id)
{
	console.log("ID to inactivate : "+id);
	$.ajax({
		url : 'transportCtrl?action=inactivate&id='+id,
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

function deleteStop(id)
{
	console.log("ID to delete : "+id);
	$.ajax({
		url : 'transportCtrl?action=del&id='+id,
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

function edit(id, area, city)
{
	console.log("ID to edit : "+id+" area : "+area+" city : "+city);
	$('#id').val(id);
	$('#areaEdit').val(area);
	$('#cityEdit').val(city);
}