<template>
    <div>
        <h3> {{ task.title }} </h3>
        <p>Przypisane do:</p>
        <ul>
            <li v-for="(group, index) in task.assignedTo" :key="index"> {{ group.name }}</li>
        </ul>
        <div v-if="task.taskType.name == 'Exercise'">
            <exercise :pk="task.exercise.pk"></exercise>
        </div>
        <div v-else>
          Kolokwium
        </div>
    </div>
</template>
<script>
import Exercise from '@/components/Exercise'

export default {
  components: {
    'exercise': Exercise
  },

  computed: {
    task () {
      let contextTask = this.$store.state.tasks.tasks.filter(task => task.pk === this.$route.params.pk)
      // filter zwraca tablicę, dlatego trzeba zwrócić pierwszy obiekt explicit
      return contextTask[0]
    }
  }
}
</script>
<style scoped>

</style>
