<template>
  <div>
    <v-container>
      <v-layout row wrap justify-space-around border>
        <v-flex md6 offset-md2>
          <h2>Moje kolokwia</h2>
        </v-flex>
        <v-flex md2>
          <v-btn to="/tasks/newTest" color="success" small>Utwórz kolokwium</v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap justify-space-around v-for="(test, index) in tests" :key="index" mt-4>
        <v-flex md6 offset-md2>
          <h3>{{ test.name }}</h3>
        </v-flex>
        <v-flex md2>
          <v-btn @click="showTestDetails(test)" color="primary" small>Szczegóły</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('tasks/getAllTests')
  },

  methods: {
    showTestDetails (test) {
      this.$router.push({
        name: 'TestDetails',
        params: { pk: test.pk }
      })
    }
  },

  computed: {
    tests () {
      return this.$store.state.tasks.tests
    }
  }

}
</script>

<style scoped>

</style>
