var storeID = {};
// var moment = require('moment');

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
    		var oneRating = item.stars;
    		var oneEntry = '';
    		oneEntry +=
    		'<div class="writtenEntry" id="' + index + '">';
    		storeID[index] = item.id;
    		//console.log(index);
    		//console.log(storeID[index]);
    		index++;
    		var numberDate = Date.parse(item.date);
        console.log(numberDate);
    		var prettyDate = Date(numberDate);
        console.log(prettyDate);
    		oneEntry +=
				'<p>' + prettyDate + '</p>' +
				'<p>Tea Name: ' + item.teaName + '</p>' +
				'<p>Vendor: ' + item.vendor + '</p>' +
				'<p>Type of Tea: ' + item.teaColorTeaType + '</p>' +
				'<div class="flavored_entry">' +
							'<input type="checkbox" class="flavored" value="flavored" id="flavored"> Flavored Tea' +
				'</div>' +
				'<div class="entry additions">Additions<br>' +
					'<div class="selected">' +
						'<input class="select cream" type="checkbox" name="cream" value="cream" id="cream"> Cream<br>' +
						'<input class="select sugar" type="checkbox" name="sugar" value="sugar" id="sugar"> Sugar<br>' +
						'<input class="select honey" type="checkbox" name="honey" value="honey" id="honey"> Honey<br>' +
						'<input class="select lemon" type="checkbox" name="lemon" value="lemon" id="lemon"> Lemon<br>' +
						'<p>Other: ' + item.otherAdditions + '</p>' +
					'</div>' +
				'</div>' +
				'<p>Aroma: ' + item.aroma + '</p>' +
				'<p>Taste: ' + item.taste + '</p>' +
				'<div class="entry rating" id="rating">Star Rating <br>' +
					'<form class="stars">';
			var oneEntryStars = '';
			for (var i = 0; i < 5; i++) {
				var starNumber = 5 - i;
				if (starNumber == item.stars) {
					oneEntryStars += '<input class="star star-' + starNumber + '" disabled id="star-' + starNumber + '" type="radio" name="star" checked/>' +
									'<label class="star star-' + starNumber + '" for="star-' + starNumber + '"></label>';
				}
				else {
					oneEntryStars += '<input class="star star-' + starNumber + '" disabled id="star-' + starNumber + '" type="radio" name="star"/>' +
									'<label class="star star-' + starNumber + '" for="star-' + starNumber + '"></label>';
				}
			}
			oneEntry += oneEntryStars;
			oneEntry += '</form>' +
				'</div>' +
				'<p>Notes: ' + item.notes + '</p>' +
				'<div class="changeButtons">' +
					'<button id="editButton" type="button">Edit</button> <button id="deleteButton" type="button">Delete</button>' +
				'</div>' +
				'<img class="border_scroll" src="fleur.png"/>' +
			'</div>';
    	    $('.entries_list_space').append(oneEntry);
    	    if (item.flavoredTeaType == true) {
    	    	$('.flavored').attr('checked', true);
    	    };
    	    $('.flavored').prop('disabled', true)
    	    if (item.creamAdditions == true) {
    	    	$('.cream').attr('checked', true);
    	    };
    	    $('.cream').prop('disabled', true)
    	    if (item.sugarAdditions == true) {
    	    	$('.sugar').attr('checked', true);
    	    };
    	    $('.sugar').prop('disabled', true)
    	    if (item.honeyAdditions == true) {
    	    	$('.honey').attr('checked', true);
    	    };
    	    $('.honey').prop('disabled', true)
    	    if (item.lemonAdditions == true) {
    	    	$('.lemon').attr('checked', true);
    	    };
    	    $('.lemon').prop('disabled', true)
    	});
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayAllEntries() {
    getAllEntries(displayAllEntries);
}

$(function() {
    getAndDisplayAllEntries();
})

function startEntryForm() {
	$('.entryButton').click(function(event) {
		var newEntryForm = '<h2>New Tea Tasting Entry</h2>' +
							'<form id="entry_form">' +
								'<div class="form-entries">' +
									'<div class="entry date">Date ' +
										'<input type="text" name="date" id="date">' +
									'</div>' +
									'<div class="entry tea-name" > Tea Name ' +
										'<input id="tea-name" type="text" name="tea name">' +
									'</div>' +
									'<div class="entry vendor">Vendor ' +
										'<input type="text" name="vendor" id="vendor">' +
									'</div>' +
									'<div class="entry tea-type"> Tea Type ' +
										'<input list="Colors" name="tea colors" id="color">' +
										'<datalist id="Colors">' +
    										'<option value="Black">' +
    										'<option value="Green">' +
    										'<option value="White">' +
    										'<option value="Oolong">' +
    										'<option value="Rooibos">' +
    										'<option value="Tisan (Herbal)">' +
    										'<option value="Pu-erh">' +
    										'<option value="Other">' +
  										'</datalist>' +
  									'</div>' +
									'<div class="entry flavored">' +
										'<input class="check" type="checkbox" name="flavored" id="flavored"> Flavored Tea ' +
									'</div>' +
									'<div class="entry additions">Additions<br>' +
										'<div class="selected">' +
											'<input class="select check cream" type="checkbox" name="cream" value="cream" id="cream"> Cream<br>' +
											'<input class="select check sugar" type="checkbox" name="sugar" value="sugar" id="sugar"> Sugar<br>' +
											'<input class="select check honey" type="checkbox" name="honey" value="honey" id="honey"> Honey<br>' +
											'<input class="select check lemon" type="checkbox" name="lemon" value="lemon" id="lemon"> Lemon<br>' +
											'Other <input class="select other-text" type="text" name="other-text" id="other-text">' +
										'</div>' +
									'</div>' +
									'<div class="entry aroma">Aroma ' +
										'<input type="text" name="aroma" id="aroma">' +
									'</div>' +
									'<div class="entry taste">Taste ' +
										'<input type="text" name="taste" id="taste">' +
									'</div>' +
									'<div class="entry rating" id="rating">Star Rating <br>' +
										'<div class="stars">' +
    										'<input class="star star-5" id="star-5" type="radio" name="star" val=5/>' +
    										'<label class="star star-5" for="star-5"></label>' +
    										'<input class="star star-4" id="star-4" type="radio" name="star" val=4/>' +
    										'<label class="star star-4" for="star-4"></label>' +
    										'<input class="star star-3" id="star-3" type="radio" name="star" val=3/>' +
    										'<label class="star star-3" for="star-3"></label>' +
    										'<input class="star star-2" id="star-2" type="radio" name="star" val=2/>' +
    										'<label class="star star-2" for="star-2"></label>' +
    										'<input class="star star-1" id="star-1" type="radio" name="star" val=1/>' +
    										'<label class="star star-1" for="star-1"></label>' +
										'</div>' +
									'</div>' +
									'<div class="entry notes">Notes ' +
										'<textarea rows="4" cols="20" type="text" name="notes" id="notes"/>' +
									'</div>' +
									'<div class="submit">' +
										'<button class="submitButton" type="button">Save Entry</button>' +
                    '<button class="cancelButton" type="button">Cancel</button>' +
									'</div>' +
								'</div>' +
							'</form>';
		$('.new_entry_form_space').html(newEntryForm);
		document.getElementById("date").defaultValue = Date();
			$(function() {
				captureEntryForm();
			});
	})

};


function captureEntryForm() {
	$('.submitButton').click(function(event) {
		event.preventDefault();
		var flavoredCheckVal;
		if ($('#flavored').is(':checked')) {
			flavoredCheckVal = true
		} else {
			flavoredCheckVal = false
		};
		var creamCheckVal;
		if ($('#cream').is(':checked')) {
			creamCheckVal = true
		} else {
			creamCheckVal = false
		};
		var sugarCheckVal;
		if ($('#sugar').is(':checked')) {
			sugarCheckVal = true
		} else {
			sugarCheckVal = false
		};
		var honeyCheckVal;
		if ($('#honey').is(':checked')) {
			honeyCheckVal = true
		} else {
			honeyCheckVal = false
		};
		var lemonCheckVal;
		if ($('#lemon').is(':checked')) {
			lemonCheckVal = true
		} else {
			lemonCheckVal = false
		};
		var starCheckVal;
		if ($('#star-5').is(':checked')) {
			starCheckVal = 5
		} else if ($('#star-4').is(':checked')) {
			starCheckVal = 4
		} else if ($('#star-3').is(':checked')) {
			starCheckVal = 3
		} else if ($('#star-2').is(':checked')) {
			starCheckVal = 2
		} else if ($('#star-1').is(':checked')) {
			starCheckVal = 1
		} else {
			starCheckVal = 0
		};
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
     	console.log(JSON.stringify(newEntry));
      	$.ajax({
    		method: 'POST',
    		url: '/entries',
    		data: JSON.stringify(newEntry),
    		success: function(json) {
      			  if(!json.error) location.reload(true);
    		},
    		error: function() {
    			alert('You must include a Tea Name')
    		},
    		dataType: 'json',
    		contentType: 'application/json'
    	});
	});
};

function starsEntries() {
	$('#myDropdown').on('click', '.dropStars', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/?stars=5', getStarsEntries);
		function getStarsEntries(data) {
			displayAllEntries(data);
		}
	});
}

$(function() {
	starsEntries();
});



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

$(function() {
    startEntryForm(captureEntryForm());
});

$(function() {
	blackEntries();
});

$(function() {
	greenEntries();
});

$(function() {
	whiteEntries();
});

$(function() {
	oolongEntries();
});

$(function() {
	rooibosEntries();
});

$(function() {
	tisanEntries();
});

$(function() {
	puerhEntries();
});
