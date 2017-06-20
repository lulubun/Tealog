
function startEntryEdit() {
	$('.entries_list_space').on('click', '.editButton', function() {
		var outerDiv = $(this).parent().parent();
		var index = outerDiv.attr('id');
		var databaseId = storeID[index];
		$.getJSON('entries/' + databaseId, fillEditForm);
	});
}

var editStarCheckVal = 0;

$('.starEdit').on('click', '#rateYoEdit', function() {
  editStarCheckVal = $("#rateYoEdit").rateYo("option", "rating"); //returns 50

  console.log(editStarCheckVal);
})

function fillEditForm(data) {
	if (data) {
		var editStars = data.stars;
		var holdId = data.id;
		$('.entriesTitle').html('');
		$('.entries_list_space').html('');
		jQuery('#myModal').modal('show');
		$('.starEdit').removeClass('starHide');
		$('.stars').addClass('starHide');
		$('.modal-title').html('Edit Tea Tasting Entry');
		$('#entryIdHolder').val(holdId);
		$('#tea-name').val(data.teaName);
		$('#vendor').val(data.vendor);
		$('#color').val(data.teaColorTeaType);
		$('#other-text').val(data.otherAdditions);
		$('#aroma').val(data.aroma);
		$('#taste').val(data.taste);
		$('#date').val(data.date);
		$('#notes').val(data.notes);
		if (data.flavoredTeaType == true) {
  		$('#flavored').attr('checked', true);
  	};
	  if (data.creamAdditions == true) {
	  	$('#cream').attr('checked', true);
	  };
	  if (data.sugarAdditions == true) {
	  	$('#sugar').attr('checked', true);
	  };
	  if (data.honeyAdditions == true) {
	  	$('#honey').attr('checked', true);
	  };
	  if (data.lemonAdditions == true) {
	  	$('#lemon').attr('checked', true);
	  };
		$("#saveIt").addClass('saveEditButton').removeClass('submitButton');
		$("#cancelModal").addClass('cancelEditButton').removeClass('close');
		$("#topClose").addClass('cancelEditButton').removeClass('close');
		$(function () {
			$("#rateYoEdit").rateYo({
				rating: editStars,
				halfStar: true,
				multiColor: {
					"startColor": "#FF0000", //RED
					"endColor"  : "#007991"  //GREEN
				}
			});
		});
	//
	// 	var editEntry = '';
	// 	editEntry +=
	// 	'<h2>Update an Entry</h2>' +
	// 	'<div class="writtenEntry" id="' + data.id + '">';
	// 	editEntry +=
	// 		'<form id="entry_edit_form">' +
	// 		'<div class="entry tea-name" > Tea Name ' +
	// 			'<input id="tea-name" value="' + data.teaName + '"/> </div>' +
	// 		'<div class="entry vendor">Vendor ' +
	// 			'<input id="vendor" value="' + data.vendor + '"/> </div>' +
	// 		'<div class="entry tea-type"> Tea Type ' +
	// 			'<input list="Colors" id="color" value="' + data.teaColorTeaType + '"/>' +
	// 			'<datalist id="Colors">' +
	// 				'<option value="Black">' +
	// 				'<option value="Green">' +
	// 				'<option value="White">' +
	// 				'<option value="Oolong">' +
	// 				'<option value="Rooibos">' +
	// 				'<option value="Tisan (Herbal)">' +
	// 				'<option value="Pu-erh">' +
	// 				'<option value="Other">' +
	// 			'</datalist>' +
	// 		'</div>' +
	// 		'<div class="flavored_entry">' +
	// 			'<input type="checkbox" class="flavored check" value="flavored" id="flavored"> Flavored Tea </div>' +
	// 		'<div class="entry additions">Additions<br>' +
	// 			'<div class="selected">' +
	// 				'<input class="select check cream" type="checkbox" name="cream" value="cream" id="cream"> Cream<br>' +
	// 				'<input class="select check sugar" type="checkbox" name="sugar" value="sugar" id="sugar"> Sugar<br>' +
	// 				'<input class="select check honey" type="checkbox" name="honey" value="honey" id="honey"> Honey<br>' +
	// 				'<input class="select check lemon" type="checkbox" name="lemon" value="lemon" id="lemon"> Lemon<br>' +
	// 				'Other:<input class="select other-text" type="text" id="other-text" value="' + data.otherAdditions + '"/>' +
	// 			'</div>' +
	// 		'</div>' +
	// 		'<div class="entry aroma">Aroma ' +
	// 			'<input type="text" name="aroma" id="aroma" value="' + data.aroma + '"/>' + '</div>' +
	// 		'<div class="entry taste">Taste ' +
	// 			'<input type="text" name="taste" id="taste" value="' + data.taste + '"/>' + '</div>' +
	// 		'<div class="entry rating" id="rating">Star Rating <br>' +
	// 			'<div class="stars">' +
	// 			 '<div id="rateYo"></div>' +
	// 			'</div>' +
	// 		'</div>' +
	// 		'<div class="entry date">Date ' +
	// 			'<input id="date" value="' + data.date + '"/> </div>' +
	// 		'<div class="entry notes">Notes ' +
	// 			'<textarea rows="4" cols="20" type="text" name="notes" id="notes">' + data.notes + '</textarea> </div>' +
	// 		'<div class="editingButton">' +
	// 			'<button type="button" class="saveEditButton">Save</button>' +
	// 			'<button type="button" class="cancelEditButton">Cancel</button>' +
	// 		'</div>';
	//     $('.entries_list_space').append(editEntry);
	//     if (data.flavoredTeaType == true) {
	//     	$('.flavored').attr('checked', true);
	//     };
	//     if (data.creamAdditions == true) {
	//     	$('.cream').attr('checked', true);
	//     };
	//     if (data.sugarAdditions == true) {
	//     	$('.sugar').attr('checked', true);
	//     };
	//     if (data.honeyAdditions == true) {
	//     	$('.honey').attr('checked', true);
	//     };
	//     if (data.lemonAdditions == true) {
	//     	$('.lemon').attr('checked', true);
	//     };
	// 		$(function () {
	// 			$("#rateYo").rateYo({
	// 				rating: editStars,
	// 				halfStar: true,
	// 				multiColor: {
	//
	// 					"startColor": "#FF0000", //RED
	// 					"endColor"  : "#007991"  //GREEN
	// 				}
	// 			});
	// 		});
 }
}

function captureEditCancel() {
	$('#myModal').on('click', '.cancelEditButton', function(event) {
		location.reload(true);
	})
}

function captureEditForm() {
	$('#myModal').on('click', '.saveEditButton', function(event) {
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
		var editedEntry = {
			id: $('#entryIdHolder').val(),
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
			stars: editStarCheckVal,
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
	$('.entries_list_space').on('click', '.deleteButton', function(event) {
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
	startEntryEdit(fillEditForm);
	captureEditForm();
	captureEditCancel();
})
