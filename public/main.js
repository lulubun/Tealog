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
      console.log(data);
    	$('.entries_list_space').html('');
    	var index = 0;
    	data.forEach(function(item) {
    		var oneRating = item.stars;
    		var oneEntry = '';
        var flavoredChecked = item.flavoredTeaType ? 'checked' : '';
        var creamChecked = item.creamAdditions ? 'checked' : '';
        var sugarChecked = item.sugarAdditions ? 'checked' : '';
        var honeyChecked = item.honeyAdditions ? 'checked' : '';
        var lemonChecked = item.lemonAdditions ? 'checked' : '';

    		oneEntry +=
    		'<div class="writtenEntry" id="' + index + '">';
    		storeID[index] = item.id;
    		//console.log(index);
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
          '<div class="rateYo"></div>' +
				'</div>' +
				'<p>Notes: ' + item.notes + '</p>' +
				'<div class="changeButtons">' +
					'<button class="editButton" type="button">Edit</button> <button class="deleteButton" type="button">Delete</button>' +
				'</div>' +
				'<img class="border_scroll" src="fleur.png"/>' +
			'</div>';
    	    $('.entries_list_space').append(oneEntry);
          var starNumberReturn = item.stars;
          $(function () {
            $(".rateYo").rateYo({
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

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayAllEntries() {
    getAllEntries(displayAllEntries);
}

// function startEntryForm() {
//   var firstDate = new Date();
//   var stringDate = firstDate.toString()
//   var prettyDate = stringDate.slice(0, 15)
// 	$('.entryButton').click(function(event) {
// 		var newEntryForm = '<h2>New Tea Tasting Entry</h2>' +
// 							'<form id="entry_form">' +
// 								'<div class="form-entries">' +
// 									'<div class="entry tea-name" > Tea Name ' +
// 										'<input id="tea-name" type="text" name="tea name">' +
// 									'</div>' +
// 									'<div class="entry vendor">Vendor ' +
// 										'<input type="text" name="vendor" id="vendor">' +
// 									'</div>' +
// 									'<div class="entry tea-type"> Tea Type ' +
// 										'<input list="Colors" name="tea colors" id="color">' +
// 										'<datalist id="Colors">' +
//     										'<option value="Black">' +
//     										'<option value="Green">' +
//     										'<option value="White">' +
//     										'<option value="Oolong">' +
//     										'<option value="Rooibos">' +
//     										'<option value="Tisan (Herbal)">' +
//     										'<option value="Pu-erh">' +
//     										'<option value="Other">' +
//   										'</datalist>' +
//   									'</div>' +
// 									'<div class="entry flavored">' +
// 										'<input class="check" type="checkbox" name="flavored" id="flavored"> Flavored Tea ' +
// 									'</div>' +
// 									'<div class="entry additions">Additions<br>' +
// 										'<div class="selected">' +
// 											'<input class="select check cream" type="checkbox" name="cream" value="cream" id="cream"> Cream<br>' +
// 											'<input class="select check sugar" type="checkbox" name="sugar" value="sugar" id="sugar"> Sugar<br>' +
// 											'<input class="select check honey" type="checkbox" name="honey" value="honey" id="honey"> Honey<br>' +
// 											'<input class="select check lemon" type="checkbox" name="lemon" value="lemon" id="lemon"> Lemon<br>' +
// 											'Other <input class="select other-text" type="text" name="other-text" id="other-text">' +
// 										'</div>' +
// 									'</div>' +
// 									'<div class="entry aroma">Aroma ' +
// 										'<input type="text" name="aroma" id="aroma">' +
// 									'</div>' +
// 									'<div class="entry taste">Taste ' +
// 										'<input type="text" name="taste" id="taste">' +
// 									'</div>' +
// 									'<div class="entry rating" id="rating">Star Rating <br>' +
// 										'<div class="stars">' +
//     										'<input class="star star-5" id="star-5" type="radio" name="star" val=5/>' +
//     										'<label class="star star-5" for="star-5"></label>' +
//     										'<input class="star star-4" id="star-4" type="radio" name="star" val=4/>' +
//     										'<label class="star star-4" for="star-4"></label>' +
//     										'<input class="star star-3" id="star-3" type="radio" name="star" val=3/>' +
//     										'<label class="star star-3" for="star-3"></label>' +
//     										'<input class="star star-2" id="star-2" type="radio" name="star" val=2/>' +
//     										'<label class="star star-2" for="star-2"></label>' +
//     										'<input class="star star-1" id="star-1" type="radio" name="star" val=1/>' +
//     										'<label class="star star-1" for="star-1"></label>' +
// 										'</div>' +
// 									'</div>' +
//                   '<div class="entry date">Date ' +
// 										'<input type="text" name="date" id="date">' +
// 									'</div>' +
// 									'<div class="entry notes">Notes ' +
// 										'<textarea rows="4" cols="20" type="text" name="notes" id="notes"/>' +
// 									'</div>' +
// 									'<div class="submit">' +
// 										'<button class="submitButton" type="button">Save Entry</button>' +
//                     '<button class="cancelButton" type="button">Cancel</button>' +
// 									'</div>' +
// 								'</div>' +
// 							'</form>';
// 		$('.entries_list_space').html(newEntryForm);
// 		document.getElementById("date").defaultValue = prettyDate;
// 			$(function() {
// 				captureEntryForm();
// 			});
// 	})
//
// };

// $('input:checkbox').on('click', function(e) {
//
//     // prevents the event from bubbling up the DOM tree
//     // eg the modal from cancelling the event
//     e.stopImmediatePropagation();
//
//     var checked = (e.currentTarget.checked) ? false : true;
//     e.currentTarget.checked=(checked) ? false : checked.toString();
// });
//
// $(document).delegate('#flavored', 'click', function(event){
//   if ($('#flavored').is(':checked')){
//     console.log('checked flavored');
//     flavoredCheckVal = true
//   }
// })
//
// $(document).ready(function () {
//     //Search the parent class, id, or tag and then try to find the <a id="addMore"></a>  as a child
//     $('.modal #flavored').on('click', function () {
//         console.log('addMore click event');
//     });
// });

var starCheckVal = 0;

$('.stars').on('click', '#rateYo', function() {
  starCheckVal = $("#rateYo").rateYo("option", "rating"); //returns 50

  console.log(starCheckVal);
})

function captureEntryForm() {
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
};

function allEntries() {
	$('#myDropdown').on('click', '.dropAll', function() {
	  getAndDisplayAllEntries();
  })
}

function blackEntries() {
	$('#myDropdown').on('click', '.dropBlack', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Black', getBlackEntries);
		function getBlackEntries(data) {
			displayAllEntries(data);
		}
	});
}

function greenEntries() {
	$('#myDropdown').on('click', '.dropGreen', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Green', getGreenEntries);
		function getGreenEntries(data) {
			displayAllEntries(data);
		}
	});
}

function whiteEntries() {
	$('#myDropdown').on('click', '.dropWhite', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=White', getWhiteEntries);
		function getWhiteEntries(data) {
			displayAllEntries(data);
		}
	});
}

function oolongEntries() {
	$('#myDropdown').on('click', '.dropOolong', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Oolong', getOolongEntries);
		function getOolongEntries(data) {
			displayAllEntries(data);
		}
	});
}

function rooibosEntries() {
	$('#myDropdown').on('click', '.dropRooibos', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Rooibos', getRooibosEntries);
		function getRooibosEntries(data) {
			displayAllEntries(data);
		}
	});
}

function tisanEntries() {
	$('#myDropdown').on('click', '.dropTisan', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Tisan+(Herbal)', getTisanEntries);
		function getTisanEntries(data) {
			displayAllEntries(data);
		}
	});
}

function puerhEntries() {
	$('#myDropdown').on('click', '.dropPuerh', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?teatype=Pu-erh', getPuerhEntries);
		function getPuerhEntries(data) {
			displayAllEntries(data);
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
