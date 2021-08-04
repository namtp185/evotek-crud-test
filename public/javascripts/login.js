console.log("login.js linked");

$.ajax({
  async: true,
  method: "GET",
  url: "/",
  success: function(data) {
    debugger
    console.log(data);
  },
  error: function(req, err){
    debugger
    console.error(err);
  }
})

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
      async: false,   
      method: "POST",
      data : $(this).serialize(),
      // cache: false,  
      url: "/users/authenticate",   
      success: function(data) {},
      error: function(req, err){
        console.error(err)
      }
    })
    .then(function(responseBody) {
      const token = "Bearer " + responseBody.token;
      console.log(token);
      localStorage.setItem('token', token);
      
    });

    console.log(localStorage.getItem("token"))

    //TODO make GET request succesfully

    $.ajax({
      async: true,
      method: "GET",
      crossDomain: true,
      dataType: "jsonp",
      jsonpCallback: "",
      url: "localhost:3000/users/2",
      headers: {
        Authorization: localStorage.getItem("token")
      },
      // beforeSend: function (xhr) {
      //   xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      // },
      success: function(data) {},
      error: function(req, err){
        console.error(err);
      }
    })
    return true; 
  });
});
