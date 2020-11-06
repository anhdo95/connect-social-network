<template>
  <div v-if="scriptsEmbedded">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',

  data() {
    return {
      scripts: {
        facebookEmbedded: false,
        googleMapEmbedded: false
      }
    }
  },

  computed: {
    scriptsEmbedded() {
      return Object.values(this.scripts).every(Boolean)
    }
  },

  created() {
    if (process.client) {
      this.embedFacebookSdk()
      this.embedGoogleMapSdk()
    }
  },

  methods: {
    embedFacebookSdk() {
      const script = document.createElement('script')
      script.async = true
      script.crossorigin = 'anonymous'
      script.addEventListener('load', this.initFacebook)

      const sdks = {
        vi: 'https://connect.facebook.net/vi_VN/sdk.js',
        en: 'https://connect.facebook.net/en_US/sdk.js'
      }

      script.src = sdks[process.env.I18N_LOCALE] || sdks.en
      document.head.appendChild(script)
    },

    initFacebook() {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v7.0'
      })

      this.scripts.facebookEmbedded = true
    },

    embedGoogleMapSdk() {
      const script = document.createElement('script')
      script.async = true
      script.crossorigin = 'anonymous'
      script.addEventListener(
        'load',
        () => (this.scripts.googleMapEmbedded = true)
      )

      const url = new URL('https://maps.googleapis.com/maps/api/js')
      url.searchParams.set('key', process.env.GOOGLE_MAP_KEY)
      url.searchParams.set('language', process.env.I18N_LOCALE) // https://developers.google.com/maps/faq#languagesupport
      url.searchParams.set('libraries', 'places')

      script.src = url.href
      document.head.appendChild(script)
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
