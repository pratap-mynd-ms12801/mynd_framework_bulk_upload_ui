$(window).on("load", function() {
    var uri_arr = document.location.pathname.split("/");
    var file_name = uri_arr[uri_arr.length - 1];
    $(".menu-list a").each(function() {
      if ($(this).attr("href") == file_name) {
        $(this).addClass("active");
      }
    });

    var theInput = document.getElementById("colorpicker");
    theInput.addEventListener("input", function(){
        var theColor = theInput.value;
        document.documentElement.style.setProperty('--secondary-color', theColor);
    }, false);

  });

  
 