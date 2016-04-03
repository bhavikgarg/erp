/**
 * 
 */

/*window.addEventListener("DOMContentLoaded", function() {
            // Grab elements, create settings, etc.
	
		console.log("Loaded, grabbing elements");
	
            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                video = document.getElementById("video"),
                videoObj = { "video": true },
                image_format= "jpeg",
                jpeg_quality= 85,
                errBack = function(error) {
                    console.log("Video capture error: ", error.code); 
                };


            // Put video listeners into place
            if(navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoObj, function(stream) {
                    video.src = stream;
                    video.play();
                    $("#snap").show();
                }, errBack);
            } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function(stream){
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                    $("#snap").show();
                }, errBack);
            } else if(navigator.mozGetUserMedia) { // moz-prefixed
                navigator.mozGetUserMedia(videoObj, function(stream){
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                    $("#snap").show();
                }, errBack);
            }
                  // video.play();       these 2 lines must be repeated above 3 times
                  // $("#snap").show();  rather than here once, to keep "capture" hidden
                  //                     until after the webcam has been activated.  

            // Get-Save Snapshot - image 
            document.getElementById("snap").addEventListener("click", function() {
                context.drawImage(video, 0, 0, 640, 480);
                // the fade only works on firefox?
                $("#video").fadeOut("slow");
                $("#canvas").fadeIn("slow");
                $("#snap").hide();
                $("#reset").show();
                $("#upload").show();
            });
            // reset - clear - to Capture New Photo
            document.getElementById("reset").addEventListener("click", function() {
                $("#video").fadeIn("slow");
                $("#canvas").fadeOut("slow");
                $("#snap").show();
                $("#reset").hide();
                $("#upload").hide();
            });
            // Upload image to sever 
            document.getElementById("upload").addEventListener("click", function(){
                var dataUrl = canvas.toDataURL("image/jpeg", 0.85);
                $("#uploading").show();
                $.ajax({
                  type: "POST",
                  url: "html5-webcam-save.php",
                  data: { 
                     imgBase64: dataUrl,
                     user: "Joe",        
                     userid: 25          
                  }
                }).done(function(msg) {
                  console.log("saved");
                  $("#uploading").hide();
                  $("#uploaded").show();
                });
            });
        }, false);*/

$(document).ready(function(){
	
	
	/* Configure a few settings and attach camera */
	
	Webcam.set({
		width: 320,
		height: 240,
		image_format: 'jpeg',
		jpeg_quality: 90
	});

	
	

	// disable the date field
	// $("#date").prop("disabled", true);
	// get the application form number on load
	console.log("Getting the application number");
	$.ajax({
		url : 'enquiryCtrl?action=getAppNo',
		type : 'GET',
		success : function(data)
		{
			console.log("Data obtained is : "+data);
			$('#formNumber').val(data);
			
			
		},
		error : function(err)
		{
			alert("Error in getting application form number..Specify manually");
		}
	});
	
	// show take image division on click of take snap button
	/*
	$('#snap').on('click', function(){
		$('#takeSnapDiv').css("display","block");	
		
		// initialising the video bar
		console.log("Loaded, grabbing elements");
		
	    	var canvas = document.getElementById("canvas"),
	        context = canvas.getContext("2d"),
	        video = document.getElementById("video"),
	        videoObj = { "video": true },
	        image_format= "jpeg",
	        jpeg_quality= 90,
	        errBack = function(error) {
	            console.log("Video capture error: ", error.code); 
	        };


	    // Put video listeners into place
	    if(navigator.getUserMedia) { // Standard
	        navigator.getUserMedia(videoObj, function(stream) {
	            video.src = stream;
	            video.play();
	            $("#snap").show();
	        }, errBack);
	    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	        navigator.webkitGetUserMedia(videoObj, function(stream){
	            video.src = window.webkitURL.createObjectURL(stream);
	            video.play();
	            $("#snap").show();
	        }, errBack);
	    } else if(navigator.mozGetUserMedia) { // moz-prefixed
	        navigator.mozGetUserMedia(videoObj, function(stream){
	            video.src = window.URL.createObjectURL(stream);
	            video.play();
	            $("#snap").show();
	        }, errBack);
	    }
	          // video.play();       these 2 lines must be repeated above 3 times
	          // $("#snap").show();  rather than here once, to keep "capture" hidden
	          //                     until after the webcam has been activated.
	    
	    $('#takePhoto').on('click', function(){
	    	$('#canvas').show();
	    	
	    	context.drawImage(video, 0 , 0, video.width , video.height);
	    	
	    });
	    /*document.getElementById("snap").addEventListener("click", function() {
            context.drawImage(video, 0, 0, 640, 480);
            // the fade only works on firefox?
            $("#video").fadeOut("slow");
            $("#canvas").fadeIn("slow");
            $("#snap").hide();
            $("#reset").show();
            $("#upload").show();
        });

	});
	
	*/
	// getting all states
	
	$.ajax({
		url : 'selectBoxData?section=state',
		type : 'GET',
		success : function(data)
		{
			var responseObj = JSON.parse(data);
			var selectField = $('.stateSelect');
			selectField.empty();
			var options = "<option value = '-1'>-- Select State -- </option>";
			$.each(responseObj, function(key, obj){
				options += "<option value = '"+obj.id+"'>"+obj.state+"</option>";
			});
			selectField.append(options);

		},
		error : function(err)
		{
			alert("Error in getting state data..");
		}
	});


	
	// validation for only image files
	$('#image').change(function () {
		$('#imageErr').html("");
		$('#submitApplication').attr('disabled', true);
		var d = this.value;
		
		// var s = d.split('.')[0].split("\\");

	    var ext = this.value.match(/\.(.+)$/)[1];
	    switch (ext) {
	        
	        case 'jpg':
	        case 'png' : 
	        case 'gif' :
	        case 'JPEG':
	        case 'PNG':
	        case 'jpeg':
	        
	            $('#submitApplication').attr('disabled', false);
	            break;
	        default:
	            $('#imageErr').html("This is not an allowed file type");
	            this.value = '';
	    }
	});
	
		
	// validation for only excel file input
	$('#file').change(function () {
		$('#fileError').html("");
		
		var d = this.value;
		
		// var s = d.split('.')[0].split("\\");

	    var ext = this.value.match(/\.(.+)$/)[1];
	    switch (ext) {
	        
	        case 'xls':
	        case 'xlsx' : 
	        case 'csv' : 
	            $('#uploadExcel').attr('disabled', false);
	            break;
	        default:
	            $('#fileError').html("This is not an allowed file type");
	        	$('#uploadExcel').attr('disabled', true);
	            this.value = '';
	    }
	});
	
	// get all classes on load
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
	
	// attach camera to created div
	$('#snap').on('click', function(){
		
		$('#takeSnapDiv').show();
		// $('#image, #OR').hide();
		Webcam.attach( '#myCamera' );
	});
	
	// capturing image on click of capture button
	$('#takePhoto').on('click', function(){
		Webcam.snap( function(data_uri) {
			// display results in page
			console.log("Data URI is : "+data_uri);
			$('#snapInput').val(data_uri);
			$('#snapshotModal').modal("hide");
			$('#preview').attr("src",data_uri);
			$('#preview').css("width",'150');
			$('#preview').css("height",'150');
			$('#preview').addClass("thumbnail");
			
		});
		Webcam.reset();
	});
	
	$('#cancel').on('click', function(){
		Webcam.reset();
	});
	
	$('#applicationForm').on('submit', function(e){
		e.preventDefault();
		
		$('#message').focus();
		var formNumber = $('#formNumber').val();
		var date = $('#date').val();
		var s_name = $('#s_name').val();
		var f_name = $('#f_name').val();
		var dob = $('#dob').val();
		var age = $('#age').val();
		var classToAdmit = $('#class').val();
		var lastPass = $('#last_passed').val();
		var passYear = $('#pass_year').val();
		var address = $('#address').val();
		var state = $('#state').val();
		var contact = $('#contact').val();
		var email = $('#email').val();
		var check = false;
		
		var snap = $('#snapInput').val();
		var image = $('#image').val();
		
		if(checkEmpty(snap) && checkEmpty(image))
		{
			$('#image').val("");
			$('#snapInput').val("");
			
			alert("Please use only one image upload method");
		}
		else {
			
		
		if(checkEmpty(formNumber))
		{
			if(checkEmpty(date))	
			{
				if(checkEmpty(s_name))
				{
					if(checkEmpty(f_name))					
					{
						if(checkEmpty(dob))
						{
							if(checkEmpty(classToAdmit))
							{
								if(checkEmpty(lastPass))
								{
									if(checkEmpty(passYear))
									{
										if(checkEmpty(address))
										{
											if(state != '-1')
											{
												if(checkEmpty(contact))
												{
													if($('.minimal').is(':checked'))
													{
														
														/*saveFormData();	*/
														if(checkEmpty(email))
														{
															if(validateEmail(email))
															{
																console.log("Sending data : "+new FormData(this));
																$.ajax({
																	url : 'enquiryCtrl?action=save',
																	type : 'POST',
																	beforeSend : function()
																	{
																		NProgress.start();
																		NProgress.set(0.4);
																	},
																	data : new FormData(this),
																	contentType: false,
			    	    											cache: false,
																	processData:false,
																	success : function(data)
																	{
																		console.log(data);
																		var obj = JSON.parse(data);
																		if(obj.error)
																		{
																			var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>"+obj.message+"</center></div>";
																			$('#message').html(content);					
																			setTimeout(function() {
															   					 $('#message').fadeOut('fast');
																			}, 1000);
																			
																					
																		}
																		else
																		{
																			var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+obj.message+"</center></div>";	
																			$('#message').html(content);					
																					
																			setTimeout(function() {
															   					$('#message').fadeOut('fast');
																			}, 1000);
																			
																		}
			
																		$("input , textarea").val("");
																		$("select").val("-1");
																		$('#preview').removeClass("thumbnail");
																		$('#preview').attr("src","assets/img/profileImages/noImage.png");
																	},
																	error : function(err)
																	{
			
																	},
																	complete : function()
																	{
																		NProgress.done();
																	}
																});
			
															}
															else
															{
																$('#emailErr').html("Invalid Email");
																$('#email').css("border","1px dashed red");
															}
														}
														else
														{
															// if email is empty , then also send to server
															console.log("Sending data : "+new FormData(this));
															$.ajax({
																url : 'enquiryCtrl?action=save',
																type : 'POST',
																beforeSend : function()
																{
																	NProgress.start();
																	NProgress.set(0.4);
																},
																data : new FormData(this),
																contentType: false,
		    	    											cache: false,
																processData:false,
																success : function(data)
																{
																	console.log(data);
																	var obj = JSON.parse(data);
																	if(obj.error)
																	{
																		var content = "<div class = 'callout callout-danger col-md-6 col-md-offset-3'><center>"+obj.message+"</center></div>";
																		$('#message').html(content);					
																		setTimeout(function() {
														   					 $('#message').fadeOut('fast');
																		}, 1000);
																		
																				
																	}
																	else
																	{
																		var content = "<div class = 'callout callout-success col-md-6 col-md-offset-3'><center>"+obj.message+"</center></div>";	
																		$('#message').html(content);					
																				
																		setTimeout(function() {
														   					$('#message').fadeOut('fast');
																		}, 1000);
																		
																	}
																	
																	$("input , textarea").val("");
																	$("select").val("-1");
																	$('#preview').removeClass("thumbnail");
																	$('#preview').attr("src","assets/img/profileImages/noImage.png");
																},
																error : function(err)
																{
		
																},
																complete : function()
																{
																	NProgress.done();
																}
															});
		
														}
	
													}
													else
													{
														$('#genderErr').html("* Select gender");					
													}
												
												}
												else
												{
													$('#contact').css('border','1px dashed red');	
													$('#contactErr').html("*Required");
												}
											}	
											else
											{
												$('#state').css('border','1px dashed red');	
												$('#stateErr').html("*Required");
											}	
										}
										else
										{
											$('#address').css('border','1px dashed red');
											$('#addressErr').html("*Required");
										}
									}
									else
									{
										$('#pass_year').css('border','1px dashed red');
										$('#pass_yearErr').html("*Required");
									}
								}
								else
								{
									$('#last_passed').css('border','1px dashed red');
									$('#last_passedErr').html("*Required");
								}
							}
							else
							{
								$('#class').css('border','1px dashed red');					
								$('#classErr').html("*Required");
							}
						}
						else
						{
							$('#dob').css('border','1px dashed red');				
							$('#dobErr').html("*Required");
						}
					}
					else
					{
						$('#f_name').css('border','1px dashed red');
						$('#f_nameErr').html("*Required");
					}
				}
				else
				{
					$('#s_name').css('border','1px dashed red');			
					$('#s_nameErr').html("*Required");
				}
			}
			else
			{
				$('#date').css('border','1px dashed red');		
				$('#dateErr').html("*Required");
			}
		}
		else
		{
			$('#formNumber').css('border','1px dashed red');
			$('#formNumberErr').html("*Required");
		}

		}
	});

	$("input, textarea, select").on('focus', function(){
		$("input, textarea, select").css('border','1px solid #d2d6de');
		$('span[id*="Err"]').html("");
	})

	 //iCheck for checkbox and radio inputs
        $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
          checkboxClass: 'icheckbox_minimal-blue',
          radioClass: 'iradio_minimal-blue'
        });


    
    $("#image").change(function(){
        readURL(this);
    });

});  // document.ready ends

/* functions for webcam */

/*
function setup() {
	Webcam.attach( '#myCamera' );
}

function take_snapshot() {
	// take snapshot and get image data
	Webcam.snap( function(data_uri) {
		// display results in page
		console.log("Data URI is : "+data_uri);
		document.getElementById('results').innerHTML = 
			'<h2>Here is your image:</h2>' + 
			'<img src="'+data_uri+'"/>';

	} );
	Webcam.reset();
}

*/
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
}

