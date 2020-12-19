<template>
  <div class="firebase-cloud-messaging">
    <h3 class="heading">Firebase Cloud Messaging</h3>
    <button class="btn btn--sign-in" @click="registerFirebaseMessagingToken">
      Subscribe
    </button>
  </div>
</template>

<script>
export default {
  name: 'FirebaseCloudMessaging',

  data() {
    return {
      unsubscribeFCM: null
    }
  },

  computed: {
    loggedInUser() {
      // Fake user
      return {
        id: 1,
        name: 'Richard Do'
      }
    }
  },

  watch: {
    loggedInUser: {
      handler(user) {
        if (user) {
          return this.registerFCM()
        }
        this.unsubscribeFCM && this.unsubscribeFCM()
      },
      immediate: true
    }
  },

  methods: {
    async registerFirebaseMessagingToken(userId) {
      const token = await this.$firebase.messaging().getToken({
        vapidKey: process.env.FIREBASE_VAPID_KEY
      })
      console.log('registerFirebaseMessagingToken', token)
      // TODO: register user's firebase token to backend
    },

    async removeFirebaseMessagingToken() {
      const token = await this.$firebase.messaging().getToken()
      console.log('removeFirebaseMessagingToken', token)
      // TODO: remove user's firebase token from backend
    },

    isServiceWorkerEnabled() {
      return (
        /* process.env.NODE_ENV === 'production' &&  */ 'serviceWorker' in
        navigator
      )
    },

    registerFCM() {
      if (this.loggedInUser) {
        this.registerFirebaseMessagingToken(this.loggedInUser.id)
        this.unsubscribeFCM = this.subscribeFCM()
      }
    },

    subscribeFCM() {
      if (this.isServiceWorkerEnabled()) {
        navigator.serviceWorker.addEventListener('message', this.handleMessage)

        return () => {
          navigator.serviceWorker.removeEventListener(
            'message',
            this.handleMessage
          )
        }
      }
    },

    handleMessage(event) {
      console.log('event', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.firebase-cloud-messaging {
  &__heading {
    margin-bottom: 1rem;
  }
}
</style>
