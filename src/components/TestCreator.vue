<template>
  <div>
    <v-content>
      <v-layout row wrap>
        <v-flex xs12 md5 offset-md4>
          <v-text-field :type="text" v-model="form.name" label="Nazwa kolokwium" required></v-text-field>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
            <v-select :items="exercises" v-model="selectedExercise" label="Cwiczenia" required>
              <template slot="item" slot-scope="data"> <!-- ten slot odpowiada za to jak obiekty sa wyswietlane w liscie -->
                    {{ data.item.title }}
                </template>
                <template slot="selection" slot-scope="data"> <!-- ten slot odpowiada za to jak wybrany obiekt jest wyswietlany -->
                    {{ data.item.title }}
                </template>
            </v-select>
        </v-flex>
        <v-flex md2>
          <v-btn color="primary" @click="addExerciseToTest">Dodaj</v-btn>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
          <v-btn color="primary" @click="createTest">Utwórz</v-btn>
        </v-flex>
        <v-flex xs12 md4 offset-md4 v-for="(exercise, index) in form.exercises" :key="index">
          {{ exercise.title }}
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedExercise: {},
      form: {
        name: '',
        exercises: []
      }
    }
  },

  methods: {
    addExerciseToTest () {
      if (this.selectedExercise === null) {
        return
      }

      if (this.form.exercises.includes(this.selectedExercise)) {
        return
      }

      this.form.exercises.push(this.selectedExercise)
    },

    createTest (event) {
      event.preventDefault()

      if (this.form.name === '') {
        alert('Nie podano nazwy kolokwium')
        return
      }

      if (this.form.exercises.length === 0) {
        alert('Nie wybrano zadnych cwiczen')
        return
      }

      console.log(this.form)

      this.$store.dispatch('tasks/createTest', this.form).then(responseData => {
        alert(responseData.message)
      })
    }
  },

  created () {

  },

  computed: {
    exercises () {
      return this.$store.state.tasks.exercises
    }
  }
}
</script>

<style scoped>
</style>
