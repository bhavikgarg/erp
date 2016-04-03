/**
 * 
 */

// function for only number input
// usage : onkeypress="return isNumber(event)"

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// this function returns true if mail is valid email , else return false

function validateEmail(mail)
{
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(filter.test(mail))
    {
        return true;
    }
    else{
        return false;
    }
}

function checkEmpty(data)
{
	if($.trim(data).length > 0)
	{
		return true;
	}
	return false;

}

// contact no validation for length
// usage : onkeydown = "checkLength(this.value, event, length)"
function checkLength(val, e, length) {
    if (val.length >= length) 
        if ( !(e.which == '46' || e.which == '8' || e.which == '13') ) // backspace/enter/del
            e.preventDefault();
}


// validation for only alphabets

function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32)
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}