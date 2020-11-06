<template>
  <div>
    <input
      ref="autocomplete"
      class="autocomplete"
      placeholder="Enter your address"
      @focus="geolocate"
    />
  </div>
</template>

<script>
const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
}

export default {
  name: 'GooglePlaces',

  data() {
    return {
      autocomplete: null
    }
  },

  mounted() {
    // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
    this.initAutocomplete()
  },

  methods: {
    initAutocomplete() {
      // eslint-disable-next-line
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        {
          // types: ['geocode'] // restricting the search predictions to geographical location types
        }
      )

      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.
      this.autocomplete.setFields([
        // 'address_components',
        // 'geometry',
        // 'icon',
        // 'name',
        // 'place_id',
        // 'formatted_address'
      ])

      this.autocomplete.addListener('place_changed', this.fillInAddress)
    },

    fillInAddress() {
      // Get the place details from the autocomplete object.
      const place = this.autocomplete.getPlace()
      console.log('place', place)

      for (const component of place.address_components) {
        const addressType = component.types[0]

        if (componentForm[addressType]) {
          const val = component[componentForm[addressType]]
          console.log(addressType, val)
        }
      }

      console.log(this.$refs.autocomplete.value)
    },

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          // eslint-disable-next-line
          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          })
          this.autocomplete.setBounds(circle.getBounds())
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  width: 100%;
  height: 40px;
  max-width: 400px;
  padding: 0.5rem 1.25rem;
}
</style>
