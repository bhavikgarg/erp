/**
 *	@Created By Bhavik Garg  
 */

$(document).ready(function(){
	
	
	$('#username').on('focus',function(){
		$(this).css("border","");
		$('#usernameError').html("");
	});
	
	$('#password').on('focus',function(){
		$(this).css("border","");
		$('#passwordError').html("");
	});
	
	$('#role').on('focus',function(){
		$(this).css("border","");
		$('#roleError').html("");
	});
	
	NProgress.configure({ parent: 'body' });

	$('#loginBTN').on('click', function(){
		
		var username = $('#username').val();
		var pwd = $('#password').val();
		var role = $('#role').val();
		
		if(checkEmpty(username))
		{
			if(checkEmpty(pwd))
			{
				
					// send the data to server
					$(this).html('<i class = "fa fa-spinner fa-spin"></i> Signing In');

					var frm = $('#loginForm');
					console.log(frm.serialize());
					$.ajax({

						url : 'login',
						type : 'POST',	
						data : frm.serialize(),
						beforeSend : function()
						{
							NProgress.start();
						},
						success : function(data)
						{
							console.log("Data recieved from servlet : "+data);
							var obj = JSON.parse(data);
							if(obj.error)
							{
								var message = "<div class = 'callout callout-danger'><center>"+obj.message+"</center></div>";
								$('#errorMsg').html(message);	
								$('#loginBTN').html("Sign In");
							}
							else
							{
								var arr = obj.message.split(",");
								var message = "<div class = 'callout callout-success'><center>"+arr[0]+"</center></div>";
								$('#errorMsg').html(message);
								
								console.log("Array elements are : 0 -> "+arr[0]+" 1 -> "+arr[1]);
								
								if(arr[1] === '1')
								{
									console.log("Sending to s/");
									setTimeout(function(){
										window.location = "s/home.jsp";
									}, 2000);
								}
								else if(arr[1] === '2')
								{
									console.log("Sending to e/");
									setTimeout(function(){
										window.location = "e/home.jsp";
									}, 2000);
								}
								else if(arr[1] === '3')
								{
									console.log("Sending to /");
									setTimeout(function(){
										window.location = "home.jsp";
									}, 2000);
								}
								else if(arr[1] === '6')
								{
									console.log("Sending to t/");
									setTimeout(function(){
										window.location = "t/home.jsp";
									}, 2000);
								}
								else if(arr[1] === '7')
								{
									// library
									console.log("Sending to l/");
									setTimeout(function(){
										window.location = "l/home.jsp";
									}, 2000);
								}
								
							}

						},
						error : function(data)
						{
								var message = "<div class = 'callout callout-danger'>Internal Server error.. try again</div>";
								$('#errorMsg').html(message);
								$('#loginBTN').html("Sign In");
						},
						complete : function()
						{
							NProgress.done();
						}

					});

			
			}
			else
			{
				$('#password').css('border','1px dashed red');
				$('#passwordError').html("* Required");
			}
		}
		else
		{	
			$('#username').css('border','1px dashed red');
			$('#usernameError').html("* Required");
		}

		

	});
	
	$("input , select").on('focus', function(){
		$('#errorMsg').html("");
		
	});
	
	

}); // document.ready ends