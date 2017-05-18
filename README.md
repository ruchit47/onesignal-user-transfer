## Copy/Transfer Subscribers between OneSignal Apps

This scripts helps you to import your users from Old OneSignal app to New app.

Sometimes you might have setup diffrent apps on OneSignal for diffrent platform. 
But when you need to combine apps to single app without loosing existing subscribers/users, there is no way to do it on OneSignal GUI.


### Usage

1. Export all users .csv file from your old [OneSignal CSV Export API](https://documentation.onesignal.com/reference#csv-export ).

2. Configure 'onesignal_app_id' and 'onesignal_app_token' with APP ID and REST API KEY of new app in which you want to import users

3. var onesignal_csv_file = "YourOldAppData.csv"

#### Run Script

    node OneSignalTransfer.js



Note: 
Script is tested to transfer iOS, Android subscribers to another app. 
It should work with web notification subscribers with HTTPS setup. But needs to be confirmed. 