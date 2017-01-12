var STARTER_LOGS = {
    "initialLogs": [
        {
        	"teaName": "Valentines",
			"date": ,
			"vendor": "adagio tea",
			"teaType": "Flavored black",
			"amountUsed": "3 tsp",
			"waterUsed": "3 cups",
			"brewTemp": "212 (rolling boil)",
			"steepingTime": "4 min",
			"additions": {
				"cream": true,
				"sugar": "2 cubes",
				"honey": false,
				"lemon": false,
				"other": ""
			},
			"aroma": "fruity",
			"taste": "chocolate and berry",
			"stars": 5,
			"notes": "This is my favorite tea."

		}
	]
};		

function getAllLogs(callbackFn) {
    setTimeout(function(){ callbackFn(STARTER_LOGS)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayAllLogs(data) {
    for (index in data.allLogs) {
       $('body').append(
        '<p>' + data.allLogs[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayAllLogs() {
    getAllLogs(displayAllLogs);
}

$(function() {
    getAndDisplayAllLogs();
})
