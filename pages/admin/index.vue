<template>
  <div class="admin">
    <h1>Redirecting you to the backend</h1>
    <a :href="url">Click here if you're not being redirected after 5 seconds.</a>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      url: process.env.PRISMIC_URL
    }
  },
  head () {
    return {
      meta: [
        { hid: 'http-equiv', 'http-equiv': 'refresh', content: `2; url=${this.url}` }
      ]
    }
  }
}
</script>
