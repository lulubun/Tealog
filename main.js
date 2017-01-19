function createNewEntry(){

}

function getAllEntries(callback) {
	var entryData = [];
	$.getJSON(DATABASE_URL, callback)
}

// this function stays the same when we connect
// to real API later
function displayAllEntries(data) {
	var allEntries = [];
    if (data) {
    	data.forEach(function(item) {
    		var oneEntry = '';
    		oneEntry += '<p>' + item.teaName + '</p>';
    		allEntries.push(oneEntry);
    	});
    	$('.entries_list_space').html(allEntries);
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
		var newEntryForm = '<h1>New Tea Tasting Entry</h1>' +
							'<form action="tea log form", name="teaLog" method="get">' +
								'<div class="form-entries">' +
									'<div class="entry date">Date' +
										'<input type="text" name="date" id="date">' +
									'</div>' +
									'<div class="entry tea-name" > Tea Name' +
										'<input id="tea-name" type="text" name="tea name">' +
									'</div>' +
									'<div class="entry vendor">Vendor' +
										'<input type="text" name="vendor" id="vendor">' +
									'</div>' +
									'<div class="entry tea-type"> Tea Type' +
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
										'<input type="checkbox" name="flavored" value="flavored" id="flavored"> Flavored Tea' +
									'</div>' +
									'<div class="entry additions">Additions<br>' +
										'<div class="selected">' +
											'<input class="select cream" type="checkbox" name="cream" value="cream" id="cream"> Cream<br>' +
											'<input class="select sugar" type="checkbox" name="sugar" value="sugar" id="sugar"> Sugar<br>' +
											'<input class="select honey" type="checkbox" name="honey" value="honey" id="honey"> Honey<br>' +
											'<input class="select lemon" type="checkbox" name="lemon" value="lemon" id="lemon"> Lemon<br>' +
											'<input class="select other" type="checkbox" name="other" id="other"> Other <input class="select other-text" type="text" name="other-text" id="other-text">' +
											'<br>' +
										'</div>' +
									'</div>' +
									'<div class="entry aroma">Aroma' +
										'<input type="text" name="aroma" id="aroma">' +
									'</div>' +
									'<div class="entry taste">Taste' +
										'<input type="text" name="taste" id="taste">' +
									'</div>' +	
									'<div class="entry rating" id="rating">Star Rating <br>' +
										'<div class="stars">' +
    										'<input class="star star-5" id="star-5" type="radio" name="star"/>' +
    										'<label class="star star-5" for="star-5"></label>' +
    										'<input class="star star-4" id="star-4" type="radio" name="star"/>' +
    										'<label class="star star-4" for="star-4"></label>' +
    										'<input class="star star-3" id="star-3" type="radio" name="star"/>' +
    										'<label class="star star-3" for="star-3"></label>' +
    										'<input class="star star-2" id="star-2" type="radio" name="star"/>' +
    										'<label class="star star-2" for="star-2"></label>' +
    										'<input class="star star-1" id="star-1" type="radio" name="star"/>' +
    										'<label class="star star-1" for="star-1"></label>' +
										'</div>' +
									'</div>' +
									'<br>' +
									'<div class="entry notes">Notes' +
										'<input type="text" name="notes" id="notes">' +
									'</div>' +
									'<div class="submit">' +	
										'<button type="submit">Save Entry</button>' +
									'</div>' +	
								'</div>' +
							'</form>';
		$('.new_entry_form_space').html(newEntryForm);
	})
};

$(function() {
    startEntryForm();
})