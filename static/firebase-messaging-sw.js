importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js')
importScripts('swenv.js')

firebase.initializeApp(process.env.FIREBASE_CONFIG)

firebase.messaging().onBackgroundMessage(function(payload) {
  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: 'window'
    })
    .then((clients) => {
      if (clients?.length) {
        clients.forEach((client) => client.postMessage(payload))
      }
    })
})
