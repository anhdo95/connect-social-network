<template>
  <div class="facebook">
    <h3 class="facebook__heading">Facebook</h3>
    <button class="btn btn--sign-in" @click="onSignIn">
      <img class="btn__icon" src="@/assets/svg/facebook.svg" />
      <span class="btn__text">Sign in</span>
    </button>
    <button v-if="isSignedIn" class="btn btn--sign-in" @click="onSignOut">
      <img class="btn__icon" src="@/assets/svg/facebook.svg" />
      <span class="btn__text">Sign out</span>
    </button>
  </div>
</template>

<script>
import { isWebview } from '@/utils/compatibility'

export default {
  name: 'Facebook',
  data() {
    return {
      isSignedIn: false
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    FB.init({
      appId: process.env.FACEBOOK_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0'
    })

    // eslint-disable-next-line no-undef
    FB.getLoginStatus((response) => {
      this.isSignedIn = response.status === 'connected'
    })
  },
  methods: {
    onSignIn() {
      if (this.isSignedIn) return

      if (isWebview()) {
        const params = {
          client_id: process.env.FB_ID,
          scope: "public_profile,email,user_link,user_friends,user_gender",
          response_type: "token",
          redirect_uri: `${window.location.origin}/auth/return/`,
          state: JSON.stringify({
            type: this.$constants.SOCIAL_TYPE.FB,
            fromUrl: window.location.href,
          }),
        }
        const url = new URL("https://www.facebook.com/v7.0/dialog/oauth")
        this.lodash.forEach(params, (value, key) => {
          url.searchParams.set(key, value)
        })

        window.location.href = url.href

        return
      }

      const options = {
        // https://developers.facebook.com/docs/facebook-login/permissions
        scope: 'public_profile,email,user_link,user_friends,user_gender',
        // return_scopes: true,
        auth_type: 'rerequest,reauthorize'
      }

      // eslint-disable-next-line no-undef
      FB.login(this.handleResponse, options)
    },
    handleResponse(response) {
      console.log('response', response)
      this.isSignedIn = response.status === 'connected'

      if (this.isSignedIn) {
        console.log(
          `Sending token "${response.authResponse.accessToken}" to the server...`
        )

        // eslint-disable-next-line no-undef
        FB.api('/me', (response) => console.log('me', response))

        // eslint-disable-next-line no-undef
        FB.api('/me/permissions', (response) =>
          console.log('permissions', response)
        )
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    },
    onSignOut() {
      // eslint-disable-next-line
      FB.logout(() => this.isSignedIn = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.facebook {
  &__heading {
    margin-bottom: 1rem;
  }
}
</style>
