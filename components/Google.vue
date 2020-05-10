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
          scope: 'profile email openid',
          prompt: 'select_account'
        })

        auth2.isSignedIn.listen(this.onSignInChanged)

        try {
          // const user = await this.requestAdditionalScopes(auth2)
          const user = await auth2.signIn()
          console.log('user', user)
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
  padding: 1rem 0;
  border-bottom: 1px solid #888;

  &__heading {
    margin-bottom: 1rem;
  }
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #f2f2f2;
  border: none;
  border-radius: 100px;
  outline: none;

  &__icon,
  &__text {
    vertical-align: middle;
  }
}
</style>
