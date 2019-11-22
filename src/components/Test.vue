<template>
    <div>
        <h3>{{ test.name }}</h3>
        <div v-for="(exercise, index) in test.exercises" :key="index">
            {{ exercise.title }}
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
