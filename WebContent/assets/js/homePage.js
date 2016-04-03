/**
 * 
 */



 $(function () {
	 /* $(".content").slimScroll({
            size: '12px', 
             
            height: '100%', 
            color: '#ff4800',
		  
		   
		    
		    size: '10px',
		    
		    color: '#ffcc00',
		    alwaysVisible: true,
		    
		    start: $('.content'),
		    
		    
		    
		    wheelStep: 10,
		    allowPageScroll: true,
		    disableFadeOut: false
              
      });*/
	 
	 NProgress.configure({ parent: '.content' });

	
	 
 $('#eventBTN').on('click', function(){

     var isCheck = $('input[id=emailDivControl]:checked').val();
     console.log("The value is : "+isCheck);



     var title = $('#eventTitle').val();
     var eventID = $('#eID').val();
     var email = $('#email').val();
     var message = $('#message').val();

     if($.trim(isCheck).length > 0 && $.trim(message).length > 0)
     {
     $.ajax({
               url: 'process.php',
               data: 'type=changetitle&title='+title+'&eventid='+eventID+'&email='+email+'&msg='+message,
               type: 'POST',
               dataType: 'json',
               success: function(response){  
                 
                 if(response.status == 'success')                
                         // $('#calendar').fullCalendar('updateEvent',event);
                       $('#eventModal').modal("hide");
               },
               error: function(e){
                 alert('Error processing your request: '+e.responseText);
               }
           });
     }
     else
     {
       $('#msgErr').html("Required");
     }
   });


   $('#emailDivControl').on('ifChecked', function(){
       $('#emailDiv').show();
   });

   $('#emailDivControl').on('ifUnchecked', function(){
       $('#emailDiv').hide();
       
       $('#email').val("");
   });   



   var zone = "05:30";  //Change this to your timezone

 $.ajax({
	   url: 'process.php',
       type: 'POST', // Send post data
       data: 'type=fetch',
       async: false,
       success: function(s){
         json_events = s;
       }
 	});


 var currentMousePos = {
     x: -1,
     y: -1
 };
   jQuery(document).on("mousemove", function (event) {
       currentMousePos.x = event.pageX;
       currentMousePos.y = event.pageY;
   });

   /* initialize the external events
   -----------------------------------------------------------------*/

   $('#external-events .fc-event').each(function() {

     // store data so the calendar knows to render an event upon drop
     $(this).data('event', {
       title: $.trim($(this).text()), // use the element's text as the event title
       stick: true // maintain when user navigates (see docs on the renderEvent method)
     });

     // make the event draggable using jQuery UI
     $(this).draggable({
       zIndex: 999,
       revert: true,      // will cause the event to go back to its
       revertDuration: 0  //  original position after the drag
     });

   });


   /* initialize the calendar
   -----------------------------------------------------------------*/

   $('#calendar').fullCalendar({
     
     events: [{"id":"14","title":"New Event","start":"2015-01-24T16:00:00+04:00","allDay":false}],
     utc: true,
     header: {
       left: 'prev,next today',
       center: 'title',
       right: 'month,agendaWeek,agendaDay'
     },
     editable: true,
     droppable: true, 
     slotDuration: '00:30:00',
     eventReceive: function(event){
       var title = event.title;
       var start = event.start.format("YYYY-MM-DD[T]HH:mm:SS");
       $.ajax({
           url: 'process.php',
           data: 'type=new&title='+title+'&startdate='+start+'&zone='+zone,
           type: 'POST',
           dataType: 'json',
           success: function(response){
             event.id = response.eventid;
             $('#calendar').fullCalendar('updateEvent',event);
           },
           error: function(e){
             console.log(e.responseText);

           }
         });
       $('#calendar').fullCalendar('updateEvent',event);
       console.log(event);
     },
     eventDrop: function(event, delta, revertFunc) {
           
           var arr = event.title.split('::');
           var title = arr[0];
           if(event.title.indexOf('::') > 0)
           {
                 if(arr[1].length > 0)
                 {
                   var email = $.trim(arr[1]);
                 }  
           }
           var start = event.start.format();
           var end = (event.end == null) ? start : event.end.format();
           $.ajax({
         url: 'process.php',
         data: 'type=resetdate&title='+title+'&start='+start+'&end='+end+'&eventid='+event.id+'&email='+email,
         type: 'POST',
         dataType: 'json',
         success: function(response){
           if(response.status != 'success')                
           revertFunc();
         },
         error: function(e){             
           revertFunc();
           alert('Error processing your request: '+e.responseText);
         }
       });
       },
       eventClick: function(event, jsEvent, view) {
         console.log(event.id);

             if(event.title.length >= 0)
             {
               var arr = event.title.split('::');
               $('#eventTitle').val(arr[0]);
               if(event.title.indexOf('::') > 0)
               {
                 if(arr[1].length > 0)
                 {
                   $('#emailDiv').css('display','block');
                   $('#email').val(arr[1]);  
                 }  
               }
               
               
             }


             $('#eID').val(event.id);
             $('#eventModal').modal('show');

             $('#eventModal').on('hidden.bs.modal', function () {

               if($('#eventTitle').val() != '' && $('#email').val() != '')
               {
                 event.title = $('#eventTitle').val()+' :: \n'+$('#email').val();  
               }
               else
               {
                 
                event.title = $('#eventTitle').val();   

               }

               
               
               $('#calendar').fullCalendar('updateEvent',event);      
               setTimeout(function(){
                 $('#eventTitle').val("");
               $('#email').val("");
               }, 2000);
               
             });
             

             /*var title = prompt('Event Title:', event.title, { buttons: { Ok: true, Cancel: false} });
             if (title){
                 
                 event.title = title;
                 console.log('type=changetitle&title='+title+'&eventid='+event.id);
                 $.ajax({
               url: 'process.php',
               data: 'type=changetitle&title='+title+'&eventid='+event.id,
               type: 'POST',
               dataType: 'json',
               success: function(response){  
                 if(response.status == 'success')                
                         $('#calendar').fullCalendar('updateEvent',event);
               },
               error: function(e){
                 alert('Error processing your request: '+e.responseText);
               }
             });
             }*/
     },
     eventResize: function(event, delta, revertFunc) {
       console.log(event);
       var title = event.title;
       var end = event.end.format();
       var start = event.start.format();
           update(title,start,end,event.id);
       },
     eventDragStop: function (event, jsEvent, ui, view) {
         if (isElemOverDiv()) {
           var con = confirm('Are you sure to delete this event permanently?');
           if(con == true) {
           $.ajax({
               url: 'process.php',
               data: 'type=remove&eventid='+event.id,
               type: 'POST',
               dataType: 'json',
               success: function(response){
                 console.log(response);
                 if(response.status == 'success'){
                   $('#calendar').fullCalendar('removeEvents');
                       getFreshEvents();
                     }
               },
               error: function(e){ 
                 alert('Error processing your request: '+e.responseText);
               }
             });
         }   
       }
     }
   });

 });


 function getFreshEvents(){
   $.ajax({
     url: 'process.php',
         type: 'POST', // Send post data
         data: 'type=fetch',
         async: false,
         success: function(s){
           freshevents = s;
         }
   });
   $('#calendar').fullCalendar('addEventSource', JSON.parse(freshevents));
 }


 function isElemOverDiv() {
       var trashEl = jQuery('#trash');

       var ofs = trashEl.offset();

       var x1 = ofs.left;
       var x2 = ofs.left + trashEl.outerWidth(true);
       var y1 = ofs.top;
       var y2 = ofs.top + trashEl.outerHeight(true);

       if (currentMousePos.x >= x1 && currentMousePos.x <= x2 &&
           currentMousePos.y >= y1 && currentMousePos.y <= y2) {
           return true;
       }
       return false;
   }

 






 function deleteOnDrop(ev) {
   
   console.log("called");
   var res = confirm("Are you sure you want to delete this event ?");
   alert(res);
 }  
 