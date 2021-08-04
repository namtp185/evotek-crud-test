console.log("login.js linked");

$(document).ready(function() {
  const loginUrl = location.pathname;

  $('#loginForm').submit(function(event) {
    event.preventDefault();

    // get all the inputs into an array.
    var $inputs = $('#myForm :input');
  
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    $.ajax({
      async: true,   
      method: "POST",
      data : $(this).serialize(),
      // cache: false,  
      url: "/users/authenticate",   
      success: function(data) {},
      error: function(req, err){
        console.error(err)
      }
    })
    .done(function(responseBody) {
      const token = responseBody.token;
      window.location.href = "/";
      console.log(token);
      $.ajax({
        async: true,
        method: "GET",
        url: "/",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function(data) {},
        error: function(req, err){
          console.error(err)
        }
      })
    });
    return true; 
  });
});
