<template>
  <div>
    <v-content>
      <v-layout row wrap>
        <v-flex xs12 md5 offset-md4>
          <v-text-field :type="text" v-model="form.title" label="Tytul" required></v-text-field>
        </v-flex>
        <v-flex xs12 md5 offset-md4>
          <v-select :items="taskTypes" v-model="form.taskType" label="Typ">

          </v-select>
        </v-flex>
        <v-flex xs12 md5 offset-md4>
          <v-select :items="exercises" v-model="form.exercise" label="Zadanie">
            <template slot="item" slot-scope="data"> <!-- ten slot odpowiada za to jak obiekty sa wyswietlane w liscie -->
              {{ data.item.title }}
            </template>
            <template slot="selection" slot-scope="data"> <!-- ten slot odpowiada za to jak wybrany obiekt jest wyswietlany -->
              {{ data.item.title }}
            </template>
          </v-select>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
          <v-select :items="groups" v-model="selectedGroup" label="Przypisz do">
            <template slot="item" slot-scope="data"> <!-- ten slot odpowiada za to jak obiekty sa wyswietlane w liscie -->
              {{ data.item.name }}
            </template>
            <template slot="selection" slot-scope="data"> <!-- ten slot odpowiada za to jak wybrany obiekt jest wyswietlany -->
              {{ data.item.name }}
            </template>
          </v-select>
        </v-flex>
        <v-flex xs12 md2>
          <v-btn color="primary" @click="addGroup">Dodaj</v-btn>
        </v-flex>
        <v-flex xs12 md5 offset-md4>
          <v-btn color="primary" @click="createTask">Utwórz zadanie</v-btn>
        </v-flex>
        <v-flex xs12 md5 offset-md4>
          Wybrane grupy:
        </v-flex>
        <v-flex xs12 md5 offset-md4 v-for="(group, index) in this.form.groups" :key="index">
          {{ group.name }}
        </v-flex>
      </v-layout>
    </v-content>
    <!--
    <h3>Kreator zadania</h3>
    <form>
      <input type="text" name="title" placeholder="Tytul" v-model="form.title">
      <br>Rodzaj:
      <select name="taskType" v-model="form.taskType">
        <option value="Exercise">Proste</option>
        <option value="Test">Kolokwium</option>
      </select>
      <br>

      <select name="exercise" v-model="form.exercise">
        <option
          v-for="exercise in exercises"
          :key="exercise"
          :value="exercise.pk"
        >{{ exercise.title }}</option>
      </select>
      <br>Przydziel do:
      <select name="groups" v-model="selectedGroup">
        <option v-for="group in groups" :key="group" :value="group">{{ group.name }}</option>
      </select>
      <input type="button" value="Dodaj" @click="addGroup">
      <br>
      <input type="submit" value="Utworz zadanie" @click="createTask">
    </form>
    <br>Wybrane grupy:
    <ul>
      <li v-for="group in this.form.groups" :key="group">{{ group.name }}</li>
    </ul>
    -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      taskTypes: ['Exercise', 'Test'],
      selectedGroup: '',
      form: {
        title: '',
        taskType: '',
        exercise: '',
        groups: []
      }
    }
  },

  methods: {
    addGroup () {
      if (this.form.groups.includes(this.selectedGroup)) {
        return
      }
      console.log('Dodaje grupe')
      this.form.groups.push(this.selectedGroup)
    },

    createTask (event) {
      event.preventDefault()

      for (let field in this.form) {
        if (this.form[field] === '') {
          alert('Nie podano wszystkich danych')
          return
        }
      }

      console.log(this.form)

      this.$store.dispatch('tasks/createTask', this.form).then(responseData => {
        alert(responseData.message)
      })
    }
  },

  computed: {
    exercises () {
      if (this.form.taskType === 'Exercise') return this.$store.state.tasks.exercises
      else return []
    },

    groups () {
      return this.$store.state.users.groups
    }
  },

  created () {
    this.$store
      .dispatch('users/loadStudents')
      .then(() => {
        console.log('Pobrano userow')
      })
      .catch(() => {
        console.log('Nie udalo sie pobrac userow')
      })

    this.$store
      .dispatch('users/loadGroups')
      .then(() => {
        console.log('Pobrano grupy')
      })
      .catch(() => {
        console.log('Nie udalo sie pobrac grup')
      })

    this.$store
      .dispatch('tasks/getAllExercises')
      .then(() => {
        console.log('Pobrano cwiczenia')
      })
      .catch(() => {
        console.log('Nie udalo sie pobrac cwiczen')
      })
  }
}
</script>

<style scoped>
