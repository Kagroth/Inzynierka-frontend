<template>
    <div>
        <v-btn color="error" @click="deleteTest">Usun</v-btn>
        <h3>{{ test.name }}</h3>
        <div v-for="(exercise, index) in test.exercises" :key="index">
            <h4> Zadanie {{ index + 1 }} </h4>
            <exercise :pk="exercise.pk"></exercise>
            <v-divider></v-divider>
        </div>
    </div>
</template>
<script>
import Exercise from '@/components/Exercise'

export default {
  components: {
    'exercise': Exercise
  },

  props: ['pk'],

  methods: {
    deleteTest () {
      this.$store.dispatch('tasks/deleteTest', this.test.pk)
    }
  },

  computed: {
    test () {
      /*
        jeżeli prop 'pk' jest zbindowany, wtedy wyszukaj test o zbindowanym pk
        w przeciwnym przypadku wyszukaj test po parametrze pk z URL
      */
      let filterParam

      if (this.pk === null || this.pk === undefined) {
        filterParam = this.$route.params.pk
      } else {
        filterParam = this.pk
      }

      let contentTest = this.$store.state.tasks.tests.find(test => test.pk === filterParam)

      return contentTest
    }
  }
}
</script>
<style scoped>

</style>
