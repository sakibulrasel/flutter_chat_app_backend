const axios = require('axios').default;

class PushNotificationController {

    async send(title, body, fcmToken, data) {
        if (!title || !body || !fcmToken) return;
        try {
            axios.post('https://fcm.googleapis.com/fcm/send',
                {
                    notification: {
                        body,
                        title
                    },
                    priority: 'high',
                    data: {
                        ...data,
                        click_action: "FLUTTER_NOTIFICATION_CLICK",
                        sound: "default",
                    },
                    to: fcmToken
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `key=AAAAp1_hWNY:APA91bH81vE160WXBkZGFDoARQp-93PKq87-e5ob8ZVwPZ7FmTxUyopdH9W_MW81aXFyiO2x-c173BEPHUgJdOsLpRijn8v33UuYhvwhddh9BDQK8znwetrkC2hPHLknZU7Lw99bSi6q`,
                    }
                }
            )
        } catch (e) {
            console.log("error push notification");
            console.log(e);
        }
    }

}

module.exports = new PushNotificationController();
