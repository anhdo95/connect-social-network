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
export default {
  name: 'GooglePlaces',

  data() {
    return {
      autocomplete: null,
      placeSearch: null,
      componentForm: {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      }
    }
  },

  mounted() {
    setTimeout(() => this.initAutocomplete(), 1000)

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
  },

  methods: {
    initAutocomplete() {
      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      // eslint-disable-next-line no-undef
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        { types: ['geocode'] }
      )
      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.
      this.autocomplete.setFields(['address_component'])
      // When the user selects an address from the drop-down, populate the
      // address fields in the form.
      this.autocomplete.addListener('place_changed', this.fillInAddress)
    },

    fillInAddress() {
      // Get the place details from the autocomplete object.
      const place = this.autocomplete.getPlace()

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      for (const component of place.address_components) {
        const addressType = component.types[0]

        if (this.componentForm[addressType]) {
          const val = component[this.componentForm[addressType]]
          console.log(val)
        }
      }
    },

    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          // eslint-disable-next-line no-undef
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
