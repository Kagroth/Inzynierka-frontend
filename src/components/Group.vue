<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex md6 offset-md2>
          <h3> {{ group.name }}</h3>
        </v-flex>
        <v-flex md2>
          <v-btn @click="deleteGroup" color="error" small>
            Usuń grupę
          </v-btn>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-layout mt-2>
        <v-flex md6 offset-md2>
          <h3>Członkowie:</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md6 offset-md2>
          Imię i nazwisko
        </v-flex>
        <v-flex md2>
          Email
        </v-flex>
      </v-layout>
      <v-layout row wrap v-for="(user, index) in group.users" :key="index">
        <v-flex md6 offset-md2>
          {{user.first_name}} {{ user.last_name}}
        </v-flex>
        <v-flex md2>
          {{ user.email }}
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-layout row wrap>
        <v-flex offset-md2 md6>
          <h3>Aktywne zadania:</h3>
        </v-flex>
      </v-layout>
      <span v-if="group.activeTasks.length > 0">
        <v-layout row wrap v-for="(task, index) in group.activeTasks" :key="index">
          <v-flex md6 offset-md2>
            {{ task.title }}
          </v-flex>
          <v-flex>
           <v-btn @click="showTaskDetails(task)" color="primary" small>Szczegóły</v-btn>
          </v-flex>
        </v-layout>
      </span>
      <span v-else>
        Brak aktywnych zadan
      </span>

      <v-divider></v-divider>

      <span v-if="group.archivedTasks.length > 0">
        <v-layout row wrap>
          <v-flex offset-md2 md6>
            <h3>Zadania zarchiwizowane:</h3>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-for="(task, index) in group.archivedTasks" :key="index">
          <v-flex md6 offset-md2>
            {{ task.title }}
          </v-flex>
          <v-flex>
           <v-btn color="primary" small disabled>Szczegoly</v-btn>
          </v-flex>
        </v-layout>
      </span>
    </v-container>
  </div>
</template>

<script>

import Task from '@/components/Task'

export default {
  components: {
    'task': Task
  },

  methods: {
    deleteGroup () {
      let confirmation = confirm('Czy na pewno chcesz usunąć grupę?')

      if (confirmation) {
        console.log(this.group)
        this.$store.dispatch('users/deleteGroup', this.group.pk).then(() => {
          this.$router.push('/groups')
        })
      }
    },

    showTaskDetails (task) {
      this.$router.push({ name: 'TaskDetails', params: { pk: task.pk } })
    }
  },

  computed: {
    group () {
      let contextGroup = this.$store.state.users.groups.find(group => group.name === this.$route.params.name)

      return contextGroup
    }
  }
}
</script>

<style scoped>
</style>
