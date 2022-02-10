<template>
  <div>
    <Button></Button>
  </div>
</template>
<script>
  import Button from '../components/Button.vue'
  export default {
    components: { Button },
    mounted() {
      this.fetchSomething()
    },
    methods: {
      async fetchSomething() {
        const PATH = '/messages'
        try {
          const messages = await this.$axios.$get(PATH)
        } catch (error) {
          console.error('axios error: ', PATH)
        }
      }
    }
  }
</script>

