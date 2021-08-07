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

      console.log(localStorage.getItem("token"))

      //TODO make GET request succesfully
      //DONE

      $.ajax({
        url: "http://localhost:3000/",
        type: 'GET',
        // Fetch the stored token from localStorage and set in the header
        headers: {"Authorization": localStorage.getItem('token')}
      })
      .done((response) => {
        const newUrl = "/";
        let newDoc = document.open("text/html", "replace");
        newDoc.write(response);
        newDoc.close();
        history.pushState({}, null, newUrl);
      });
      
    });

    
    return true; 
  });

  $("a.profile-link").click(function(event) {
    event.preventDefault();
    const thisEl = this;
    const fetchUrl = "http://localhost:3000" + $(thisEl).attr("href");
    $.ajax({
      url: fetchUrl,
      type: 'GET',
      // Fetch the stored token from localStorage and set in the header
      headers: {"Authorization": localStorage.getItem('token')}
    })
    .done((response) => {
      const newUrl = fetchUrl;
      let newDoc = document.open("text/html", "replace");
      newDoc.write(response);
      newDoc.close();
      history.pushState({}, null, newUrl);
    });
  });


  // For secure reason

});

