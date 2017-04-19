
function startEntryEdit() {
	$('.entries_list_space').on('click', '#editButton', function() {
		var outerDiv = $(this).parent().parent();
		var index = outerDiv.attr('id');
		var databaseId = storeID[index];
		$.getJSON('entries/' + databaseId, fillEditForm);
	});
}

function fillEditForm(data) {
	if (data) {
		$('.entriesTitle').html('');
		$('.entries_list_space').html('');
		$('.new_entry_form_space').html('');
		var oneRating = data.stars;
		var editEntry = '';
		editEntry +=
		'<h2>Update an Entry</h2>' +
		'<div class="writtenEntry" id="' + data.id + '">';
		var numberDate = Date.parse(data.date);
		var prettyDate = Date(numberDate);
		editEntry +=
			'<form id="entry_edit_form">' +
			'<div class="entry date">Date ' +
				'<input id="date" value="' + prettyDate + '"/> </div>' +
			'<div class="entry tea-name" > Tea Name ' +
				'<input id="tea-name" value="' + data.teaName + '"/> </div>' +
			'<div class="entry vendor">Vendor ' +
				'<input id="vendor" value="' + data.vendor + '"/> </div>' +
			'<div class="entry tea-type"> Tea Type ' +
				'<input list="Colors" id="color" value="' + data.teaColorTeaType + '"/>' +
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
			'<div class="flavored_entry">' +
				'<input type="checkbox" class="flavored check" value="flavored" id="flavored"> Flavored Tea </div>' +
			'<div class="entry additions">Additions<br>' +
				'<div class="selected">' +
					'<input class="select check cream" type="checkbox" name="cream" value="cream" id="cream"> Cream<br>' +
					'<input class="select check sugar" type="checkbox" name="sugar" value="sugar" id="sugar"> Sugar<br>' +
					'<input class="select check honey" type="checkbox" name="honey" value="honey" id="honey"> Honey<br>' +
					'<input class="select check lemon" type="checkbox" name="lemon" value="lemon" id="lemon"> Lemon<br>' +
					'Other:<input class="select other-text" type="text" id="other-text" value="' + data.otherAdditions + '"/>' +
				'</div>' +
			'</div>' +
			'<div class="entry aroma">Aroma ' +
				'<input type="text" name="aroma" id="aroma" value="' + data.aroma + '"/>' + '</div>' +
			'<div class="entry taste">Taste ' +
				'<input type="text" name="taste" id="taste" value="' + data.taste + '"/>' + '</div>' +
			'<div class="entry rating" id="rating">Star Rating <br>' +
				'<div class="stars">';
		var oneEntryStars = '';
		for (var i = 0; i < 5; i++) {
			var starNumber = 5 - i;
			if (starNumber == data.stars) {
				oneEntryStars += '<input class="star star-' + starNumber + '" id="star-' + starNumber + '" type="radio" name="star" checked/>' +
								'<label class="star star-' + starNumber + '" for="star-' + starNumber + '"></label>';
			}
			else {
				oneEntryStars += '<input class="star star-' + starNumber + '" id="star-' + starNumber + '" type="radio" name="star"/>' +
								'<label class="star star-' + starNumber + '" for="star-' + starNumber + '"></label>';
			}
		}
		editEntry += oneEntryStars;
		editEntry += '</div>' +
			'</div>' +
			'<div class="entry notes">Notes ' +
				'<textarea rows="4" cols="20" type="text" name="notes" id="notes">' + data.notes + '</textarea> </div>' +
			'<div class="editingButton">' +
				'<button type="button" class="saveEditButton">Save Changes</button>' +
				'<button type="button" class="cancelEditButton">Cancel</button>' +
			'</div>';
	    $('.new_entry_form_space').append(editEntry);
	    if (data.flavoredTeaType == true) {
	    	$('.flavored').attr('checked', true);
	    };
	    if (data.creamAdditions == true) {
	    	$('.cream').attr('checked', true);
	    };
	    if (data.sugarAdditions == true) {
	    	$('.sugar').attr('checked', true);
	    };
	    if (data.honeyAdditions == true) {
	    	$('.honey').attr('checked', true);
	    };
	    if (data.lemonAdditions == true) {
	    	$('.lemon').attr('checked', true);
	    };
	}
}

function captureEditCancel() {
	$('.new_entry_form_space').on('click', '.cancelEditButton', function(event) {
		location.reload(true);
	})
}

function captureEditForm() {
	$('.new_entry_form_space').on('click', '.saveEditButton', function(event) {
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
     	var editedEntry = {
     		id: $('.writtenEntry').attr('id'),
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
     	console.log(JSON.stringify(editedEntry));
      	$.ajax({
    		method: 'PUT',
    		url: '/entries/' + editedEntry.id,
    		data: JSON.stringify(editedEntry),
    		success: function(json) {
      			  if(!json.error) location.reload(true);
    		},
    		error: function() {
    			alert('Error: Your edit was not saved')
    		},
    		dataType: 'json',
    		contentType: 'application/json'
    	});
	});
};

function entryDelete() {
	$('.entries_list_space').on('click', '#deleteButton', function(event) {
		console.log('click delete')
		var outerDiv = $(this).parent().parent();
		var index = outerDiv.attr('id');
		var databaseId = storeID[index];
		$.ajax({
			method: 'DELETE',
			url: 'entries/' + databaseId,
			success: function(json) {
				if(!json.error) location.reload(true);
			},
			error: function() {
				alert('Error: Unable to delete entry');
			}
		});
	});
};

$(function() {
	entryDelete();
})

$(function() {
	startEntryEdit(fillEditForm);
});


$(function() {
	captureEditForm();
});

$(function() {
	captureEditCancel();
});
