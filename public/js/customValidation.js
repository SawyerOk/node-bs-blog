// Wait for the DOM to be ready
$(function() {
    
    $("#register-form").validate({
      // Specify validation rules
      errorElement: 'div',
      rules: {
     
        title: {
            required : true,
            minlength : 3
        },
        text : {
            required : true,
            minlength : 5
        }
      },
      // Specify validation error messages
      messages: {
        title: {
            required : "Enter your name",
            minlength : "Title must be at least 3 characters long"
        },  
        text: {
            required : "Enter your username",
            minlength : "Text must be at least 3 characters long"
        },
        
       
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });

  });