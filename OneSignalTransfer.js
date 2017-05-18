var csv = require('csv-parser');
var fs = require('fs');
var limit = require("simple-rate-limiter");

//Throttling api calls at 5 requests/second
var request = limit(require("request")).to(5).per(1000);


/* Configuration */

// Export user data from your OLD OneSignal app as csv file. https://documentation.onesignal.com/reference#csv-export   
var onesignal_csv_file = "YOUR_OLD_SUBSCRIBERS_DUMP.csv";

// APP ID and REST API KEY of NEW APP in which you want to import users
var onesignal_app_id = 'YOU NEW OneSignal APP ID';
var onesignal_app_token = 'REST API KEY OF NEW APP';


/* Configuration Ends */


var i =0;

fs.createReadStream(onesignal_csv_file)
	.pipe(csv())
	.on('data', function(data) {

		console.log(data.id);

		var tag = '{' + data.tags.replace(/=>/g, ':') + '}';
		data.tags = JSON.parse(tag);
		data.tags.debug_tag = "imported_from_csv";

		var request_obj = {
			app_id: onesignal_app_id,
			id: '',
			identifier: '',
			session_count: 0,
			language: 'en',
			timezone: 19800,
			game_version: '',
			device_os: '',
			device_type: '',
			device_model: '',
			ad_id: '',
			tags: {},
			last_active: '',
			playtime: 0,
			amount_spent: 0,
			created_at: '',
			invalid_identifier: '',
			badge_count: 0
		};

		request_obj = Object.assign(request_obj, data);


		var options = {
			method: 'POST',
			url: 'https://onesignal.com/api/v1/players',
			headers: {
				'cache-control': 'no-cache',
				authorization: 'Basic ' + onesignal_app_token,
				'content-type': 'application/json'
			},
			body: request_obj,
			json: true
		};

		request(options, function(error, response, body) {
			if (error) {
				console.log(error);
			}

			console.log(body);
		});

		i++;
		console.log(i);

	})