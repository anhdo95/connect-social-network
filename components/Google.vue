<template>
  <div class="google">
    <h3 class="google__heading">Google</h3>
    <button class="btn btn--sign-in" @click="onSignIn">
      <img class="btn__icon" src="@/assets/svg/google.svg" />
      <span class="btn__text">Sign in</span>
    </button>
    <button v-if="isSignedIn" class="btn btn--sign-in" @click="onSignOut">
      <img class="btn__icon" src="@/assets/svg/google.svg" />
      <span class="btn__text">Sign out</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Google',
  data() {
    return {
      isSignedIn: false
    }
  },
  created() {},
  methods: {
    onSignIn() {
      // eslint-disable-next-line no-undef
      gapi.load('auth2', async () => {
        // eslint-disable-next-line no-undef
        const auth2 = gapi.auth2.init({
          client_id: process.env.GOOGLE_CLIENT_ID,
          scope: 'profile email openid https://www.googleapis.com/auth/drive',
          prompt: 'select_account'
        })

        auth2.isSignedIn.listen(this.onSignInChanged)

        try {
          await this.grantOfflineAccess(auth2)

          // const user = await this.requestAdditionalScopes(auth2)
          // const user = await auth2.signIn()

          // console.log('user', user)
        } catch (error) {
          // popup_closed_by_user | access_denied
          console.error(error)
        }
      })
    },
    onSignInChanged(isSignedIn) {
      this.isSignedIn = isSignedIn
    },
    async requestAdditionalScopes(auth2) {
      // eslint-disable-next-line no-undef
      const options = new gapi.auth2.SigninOptionsBuilder({
        scope: 'https://www.googleapis.com/auth/drive'
      })

      const user = auth2.currentUser.get()
      return await user.grant(options)
    },
    /**
     * To use Google services on behalf of a user when the user is offline
     */
    async grantOfflineAccess(auth2) {
      const response = await auth2.grantOfflineAccess()

      console.log(`Sending code "${response.code}" to the server...`)
    },
    onSignOut() {
      // eslint-disable-next-line no-undef
      // gapi.auth2
      //   .getAuthInstance()
      //   .signOut()
      //   .then(() => console.log('User signed out!'))

      // eslint-disable-next-line no-undef
      gapi.auth2
        .getAuthInstance()
        .disconnect()
        .then(() => console.log('User disconnected!'))
    }
  }
}
</script>

<style lang="scss" scoped>
.google {
  &__heading {
    margin-bottom: 1rem;
  }
}
</style>
