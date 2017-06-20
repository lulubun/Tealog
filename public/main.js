var storeID = {};

function dropList() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function getAllEntries(callback) {
	var entryData = [];
	$.getJSON('/entries/', callback)
}

function displayAllEntries(data) {
	var allEntries = [];
  if (data) {
  	$('.entries_list_space').html('');
  	var index = 0;
  	data.forEach(function(item) {
      var starNumberReturn = item.stars;
  		var oneEntry = '';
      var flavoredChecked = item.flavoredTeaType ? 'checked' : '';
      var creamChecked = item.creamAdditions ? 'checked' : '';
      var sugarChecked = item.sugarAdditions ? 'checked' : '';
      var honeyChecked = item.honeyAdditions ? 'checked' : '';
      var lemonChecked = item.lemonAdditions ? 'checked' : '';

  		oneEntry +=
  		'<div class="writtenEntry" id="' + index + '">';
  		storeID[index] = item.id;
      var starID = "star" + index.toString();
  		//console.log(storeID[index]);
  		index++;
  		oneEntry +=
			'<h1>Tea Name: ' + item.teaName + '</h1>' +
			'<h3>Vendor: ' + item.vendor + '</h3>' +
			'<p>Type of Tea: ' + item.teaColorTeaType + '</p>' +
			'<div class="flavored_entry">' +
						'<input type="checkbox" class="flavored" value="flavored" ' + flavoredChecked + ' disabled> Flavored Tea' +
			'</div>' +
			'<div class="entry additions">Additions<br>' +
				'<div class="selected">' +
					'<input class="select cream" type="checkbox" name="cream" value="cream" ' + creamChecked + ' disabled> Cream<br>' +
					'<input class="select sugar" type="checkbox" name="sugar" value="sugar" ' + sugarChecked + ' disabled> Sugar<br>' +
					'<input class="select honey" type="checkbox" name="honey" value="honey" ' + honeyChecked + ' disabled> Honey<br>' +
					'<input class="select lemon" type="checkbox" name="lemon" value="lemon" ' + lemonChecked + ' disabled> Lemon<br>' +
					'<p>Other: ' + item.otherAdditions + '</p>' +
				'</div>' +
			'</div>' +
			'<p>Aroma: ' + item.aroma + '</p>' +
			'<p>Taste: ' + item.taste + '</p>' +
      '<p>Date: ' + item.date + '</p>' +
			'<div class="entry rating">Star Rating <br/><br/>' +
        '<div class="rateYo" id=' + starID + '></div>' +
			'</div>' +
			'<p>Notes: ' + item.notes + '</p>' +
			'<div class="changeButtons">' +
				'<button class="editButton" type="button">Edit</button> <button class="deleteButton" type="button">Delete</button>' +
			'</div>' +
			'<img class="border_scroll" src="fleur.png"/>' +
		'</div>';
  	    $('.entries_list_space').append(oneEntry);
        $(function () {
          $("#" + starID).rateYo({
            rating: starNumberReturn,
            readOnly: true,
            multiColor: {

              "startColor": "#FF0000", //RED
              "endColor"  : "#007991"  //GREEN
            }
          });
        });
  	});
  }
}

function getAndDisplayAllEntries() {
  getAllEntries(displayAllEntries);
}

var starCheckVal = 0;

$('.stars').on('click', '#rateYo', function() {
  starCheckVal = $("#rateYo").rateYo("option", "rating"); //returns 50

  console.log(starCheckVal);
})

$('.submit').on('click', '.submitButton', function() {
	event.preventDefault();
	var flavoredCheckVal = false,
  creamCheckVal = false,
  sugarCheckVal = false,
  honeyCheckVal = false,
  lemonCheckVal = false;

	if ($('#flavored').prop('checked')) {
		flavoredCheckVal = true
	}
	if ($('#cream').prop('checked')) {
		creamCheckVal = true
	}
	if ($('#sugar').is(':checked')) {
		sugarCheckVal = true
	}
	if ($('#honey').is(':checked')) {
		honeyCheckVal = true
	}
	if ($('#lemon').is(':checked')) {
		lemonCheckVal = true
	}

 	var newEntry = {
		teaName: $("#tea-name").val(),
		date: $("#date").val(),
    vendor: $("#vendor").val(),
    teaColorTeaType: $("#color").val(),
    flavoredTeaType: flavoredCheckVal,
    creamAdditions: creamCheckVal,
    sugarAdditions: sugarCheckVal,
    honeyAdditions: honeyCheckVal,
    lemonAdditions: lemonCheckVal,
    otherAdditions: $("#other-text").val(),
    aroma: $("#aroma").val(),
    taste: $("#taste").val(),
    stars: starCheckVal,
    notes:$("#notes").val()
 	};
  console.log(newEntry);
 	console.log(JSON.stringify(newEntry));
	$.ajax({
		method: 'POST',
		url: '/entries',
		data: JSON.stringify(newEntry),
		success: function(json) {
  		if(!json.error) location.reload(true);
		},
		error: function(json) {
			alert('Error: Failed to create new entry')
      console.log(json.error);
		},
		dataType: 'json',
		contentType: 'application/json'
	});
})

function allEntries() {
	$('#myDropdown').on('click', '.dropAll', function() {
	  getAndDisplayAllEntries();
  })
}

function blackEntries() {
	$('#myDropdown').on('click', '.dropBlack', function() {
    console.log('black tea');
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Black', getBlackEntries);
		function getBlackEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass('hideMe');
		}
	});
}

function greenEntries() {
	$('#myDropdown').on('click', '.dropGreen', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Green', getGreenEntries);
		function getGreenEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass('hideMe');
		}
	});
}

function whiteEntries() {
	$('#myDropdown').on('click', '.dropWhite', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=White', getWhiteEntries);
		function getWhiteEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass('hideMe');
		}
	});
}

function oolongEntries() {
	$('#myDropdown').on('click', '.dropOolong', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Oolong', getOolongEntries);
		function getOolongEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass("hideMe");
		}
	});
}

function rooibosEntries() {
	$('#myDropdown').on('click', '.dropRooibos', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Rooibos', getRooibosEntries);
		function getRooibosEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass('hideMe');
		}
	});
}

function tisanEntries() {
	$('#myDropdown').on('click', '.dropTisan', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Tisan+(Herbal)', getTisanEntries);
		function getTisanEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass('hideMe');
		}
	});
}

function puerhEntries() {
	$('#myDropdown').on('click', '.dropPuerh', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Pu-erh', getPuerhEntries);
		function getPuerhEntries(data) {
			displayAllEntries(data);
      $('#allTeaBtn').removeClass('hideMe');
		}
	});
}

// $(function() {
//     startEntryForm(captureEntryForm());
// });

$(function() {
  getAndDisplayAllEntries();
  whiteEntries();
  oolongEntries();
  rooibosEntries();
  tisanEntries();
  puerhEntries();
	blackEntries();
  greenEntries();
  addDate();
  allEntries();
});

$(function () {

  $("#rateYo").rateYo({
    halfStar: true,
    multiColor: {

      "startColor": "#FF0000", //RED
      "endColor"  : "#007991"  //GREEN
    }
  });



});

function addDate(){
  var firstDate = new Date();
  var stringDate = firstDate.toString()
  var prettyDate = stringDate.slice(0, 15)
  $('#date').val(prettyDate)
}
