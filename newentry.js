document.getElementById("date").value = Date();

function recordEntry() {
  $(".submit").on("click", "button", function(event) {
  	validateForm();
  	var date = $('.date'.val());
  	var teaName = $('#tea-name'.val());
  	var vendor = $('#vendor'.val());
  	var teaColor = $('#color'.val());
  	var flavored = $('#flavored'.prop());
  	var cream = $('#cream'.prop());
  	var sugar = $('#sugar'.prop());
  	var honey = $('#honey'.prop());
  	var lemon = $('#lemon'.prop());
  	var other = $('#other'.prop());
  	var otherText = $('#other-text'.val());
  	var aroma = $('#aroma'.val());
  	var taste = $('#taste'.val());
  	//var rating =
  	var notes = $('#notes'.val());


    var ajax = $.ajax('/signup', {
      type: 'POST',
      data: JSON.stringify(newUser),
      dataType: 'json',
      contentType: 'application/json'
    });
    ajax.done(function(res){
      accountStatus.text('Your account was successfully created, please sign in');
    });
  });
};

function validateForm() {
    var teaName = document.forms["teaLog"]["tea-name"].value;
    if (teaName == "") {
        alert("Tea name must be filled out");
        return false;
    }
}

/*$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
    */
}
