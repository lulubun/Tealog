const DATABASE_URL = //??

function getAllEntries(callback) {
	var entryData = [];
	$.getJSON(DATABASE_URL, callback)
}

// this function stays the same when we connect
// to real API later
function displayAllEntries(data) {
	var oneEntry = {};
    if (data) {
    	data.forEach(function(item) {
    		oneEntry += '<p>' //I'm lost
    	})
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
