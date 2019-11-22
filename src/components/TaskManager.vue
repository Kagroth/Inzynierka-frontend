
<template>
    <div>
        <v-container>
            <v-layout row wrap justify-center>
                <v-flex md2>
                    <v-btn to="/tasks/tasks">Zadania</v-btn>
                </v-flex>
                <v-flex md2 v-if="userType.name === 'Teacher'">
                    <v-btn to="/tasks/exercises">Ćwiczenia</v-btn>
                </v-flex>
                <v-flex md2 v-if="userType.name === 'Teacher'">
                    <v-btn to="/tasks/tests">Kolokwia</v-btn>
                </v-flex>
            </v-layout>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
export default {
  computed: {
    userType () {
      return this.$store.state.auth.profile.userType
    }
  }
}
</script>

<style scoped>

</style>
