/**
 * 
 */

$(document).ready(function(){
	
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
		$('#submitSettings').attr('disabled', true);
		var d = this.value;
		var check = false;
		// var s = d.split('.')[0].split("\\");

	    var ext = this.value.match(/\.(.+)$/)[1];
	    switch (ext) {
	        
	        case 'jpg':
	        case 'png' : 
	        case 'gif' :
	        case 'JPEG':
	        case 'PNG':
	        case 'jpeg':
	        
	            $('#submitSettings').attr('disabled', false);
	            check = true;
	            break;
	        default:
	            $('#imageErr').html("This is not an allowed file type");
	            this.value = '';
	    }
	    
	    // if file is valid image , then check for its size
	    if(check)
	    {
	    	//Get reference of FileUpload.
	    	$('#submitSettings').attr('disabled', true);
	        var fileUpload = $(this)[0];
	 
	        //Check whether the file is valid Image.
	        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
	        if (regex.test(fileUpload.value.toLowerCase())) {
	            //Check whether HTML5 is supported.
	            if (typeof (fileUpload.files) != "undefined") {
	                //Initiate the FileReader object.
	                var reader = new FileReader();
	                //Read the contents of Image File.
	                reader.readAsDataURL(fileUpload.files[0]);
	                reader.onload = function (e) {
	                    //Initiate the JavaScript Image object.
	                    var image = new Image();
	                    //Set the Base64 string return from FileReader as source.
	                    image.src = e.target.result;
	                    image.onload = function () {
	                        //Determine the Height and Width.
	                        var height = this.height;
	                        var width = this.width;
	                        if (height > 100 || width > 100) {
	                            $('#imageErr').html("Dimensions of image should be 100 * 100 px");
	                            $('#submitSettings').attr('disabled', true);
	                            return false;
	                        }
	                        $('#submitSettings').attr('disabled', false);
	                        return true;
	                    };
	                }
	            } else {
	            	$('#submitSettings').attr('disabled', false);
	                return false;
	            }
	        } else {
	            $('#imageErr').html("Please select a valid image file");
	            $('#submitSettings').attr('disabled', true);
	            return false;
	        }
	    }
	    
	});

	
	
	$('#settingsForm').on('submit', function(e){
		e.preventDefault();
		$('#message').focus();
		
		var schoolName = $('#schoolName').val();
		var address = $('#address').val();
		var pin = $('#pin').val();
		var state = $('#state').val();
		var contact = $('#contact').val();
		var email = $('#email').val();
		var prefix = $('#prefix').val();
		var check = false;
		
		if($.trim(schoolName).length > 0)
		{
			if($.trim(address).length > 0)	
			{
				if($.trim(pin).length > 0)
				{
					if($.trim(state).length > 0 && state != "-1")					
					{
						if($.trim(contact).length > 0)
						{
							if($.trim(email).length > 0 && validateEmail(email))
							{
								if($.trim(prefix).length > 0)
								{
													/*saveFormData();	*/
									var d = new FormData(this);
									console.log("Data is : "+d);
									$.ajax({
										
										url : 'settings?action=save',
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
									$('#prefix').css('border','1px dashed red');
									$('#prefixErr').html("*Required");
								}
							}
							else
							{
								$('#email').css('border','1px dashed red');					
								$('#emailErr').html("Invalid email");
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
					$('#pin').css('border','1px dashed red');			
					$('#pinErr').html("*Required");
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
			$('#schoolName').css('border','1px dashed red');
			$('#schoolNameErr').html("*Required");
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

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
}

