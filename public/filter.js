// function allEntries() {
// 	$('#myDropdown').on('click', '.dropAll', function() {
// 		$('.entries_list_space').html('');
// 		$.getJSON('entries/');
// 			displayAllEntries(data);
// 	});
// }

function blackEntries() {
	$('#myDropdown').on('click', '.dropBlack', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getBlackEntries);
		function getBlackEntries(data) {
    		var blackTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='Black') {
    					blackTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(blackTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}

function greenEntries() {
	$('#myDropdown').on('click', '.dropGreen', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getGreenEntries);
		function getGreenEntries(data) {
    		var greenTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='Green') {
    					greenTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(greenTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}

function whiteEntries() {
	$('#myDropdown').on('click', '.dropWhite', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getWhiteEntries);
		function getWhiteEntries(data) {
    		var whiteTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='White') {
    					whiteTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(whiteTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}

function oolongEntries() {
	$('#myDropdown').on('click', '.dropOolong', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getOolongEntries);
		function getOolongEntries(data) {
    		var oolongTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='Oolong') {
    					oolongTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(oolongTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}

function rooibosEntries() {
	$('#myDropdown').on('click', '.dropRooibos', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getRooibosEntries);
		function getRooibosEntries(data) {
    		var rooibosTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='Rooibos') {
    					rooibosTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(rooibosTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}

function tisanEntries() {
	$('#myDropdown').on('click', '.dropTisan', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getTisanEntries);
		function getTisanEntries(data) {
    		var tisanTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='Tisan (Herbal)') {
    					tisanTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(tisanTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}

function puerhEntries() {
	$('#myDropdown').on('click', '.dropPuerh', function() {
		$('.entries_list_space').html('');
		$.getJSON('entries/', getPuerhEntries);
		function getPuerhEntries(data) {
    		var puerhTeaEntries = [];
    		if (data) {
	    		data.forEach(function(item) {
    				if (item.teaColorTeaType==='Pu-erh') {
    					puerhTeaEntries.push(item);
    				}
    			});
			};
			displayAllEntries(puerhTeaEntries);
			$('#allTeaBtn').removeClass('hideMe');

		}
	});
}
