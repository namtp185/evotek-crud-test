console.log('signup.js linked')

$(document).ready(function() {
  $("#signupForm").submit(function(event) {
    console.log("hi")
    event.preventDefault();
    
    // get all the inputs into an array.
    const $inputs = $('#signupForm  :input');
  
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    let values = {};
    $inputs.each(function() {
      console.log($(this).val())
      console.log($(this).attr("name"));
      values[this.name] = $(this).val();
    });
    console.log(values);

    $.ajax({
      async: true,   
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data : JSON.stringify(values),
      // cache: false,  
      url: "/users/",   
      success: function(data) {},
      error: function(req, err){
        console.error(err)
      }
    })
    .then(function(responseBody) {
      console.log(responseBody.message);
      $("#messagePlaceholder").attr("class", "text-success");
      $("#messagePlaceholder").html(responseBody.message);
    })
    .fail((err) => {
      console.error(err.message);
      $("#messagePlaceholder").attr("class", "text-danger");
      $("#messagePlaceholder").html(responseBody.message);
    })
    ;

    return true;
  });
});