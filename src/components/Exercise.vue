<template>
    <div>
        <v-btn color="error" @click="deleteExercise">Usun</v-btn>
        <h3>{{ exercise.title }}</h3>
        <p> Technologia - {{ exercise.language.name }}</p>
        <p> Poziom zaawansowania - {{ exercise.level.name }}</p>
        <p> Treść: <br> {{ exercise.content }}</p>
    </div>
</template>
<script>
export default {
  props: ['pk'],

  methods: {
    deleteExercise () {
      this.$store.dispatch('tasks/deleteExercise', this.exercise.pk)
    }
  },

  computed: {
    exercise () {
      /*
        jeżeli prop 'pk' jest zbindowany, wtedy wyszukaj exercise o zbindowanym pk
        w przeciwnym przypadku wyszukaj exercise po parametrze pk z URL
      */
      let filterParam

      if (this.pk === null || this.pk === undefined) {
        filterParam = this.$route.params.pk
      } else {
        filterParam = this.pk
      }

      let contextExercise = this.$store.state.tasks.exercises.find(exercise => exercise.pk === filterParam)

      return contextExercise
    }
  }
}
</script>
<style scoped>

</style>
