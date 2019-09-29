<template>
  <div>
    <!--
        <router-link to="/">Strona glowna</router-link><br><br>
    -->
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 md4 offset-md4>
            <v-text-field :type="text" v-model="form.username" label="Nazwa użytkownika" required></v-text-field>
          </v-flex>
          <v-flex xs12 md4 offset-md4>
            <v-text-field type="password" v-model="form.password" label="Hasło" requried></v-text-field>
          </v-flex>
          <v-flex xs12 md4 offset-md4>
            <v-btn color="primary" @click="loginUser">Zaloguj</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <!--
        <form>
            <input type="text" placeholder="Nazwa uzytkownika" v-model="form.username"/><br>
            <input type="password" placeholder="haslo" v-model="form.password"/><br>
            <input type="submit" value="Zaloguj" @click="loginUser"/>
        </form>
    -->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },

  validations: {
    form: {
      username: {
        required
      },

      password: {
        required
      }
    }
  },

  methods: {
    loginUser (event) {
      event.preventDefault()

      if (this.$v.$invalid) {
        alert('Nie podano wszystkich danych logowania')
        return
      }

      this.$store
        .dispatch('auth/loginUser', this.form)
        .then(() => {
          alert('Zalogowano')
          console.log('Przekierowuje do /groups')
          this.$router.push('/')
        })
        .catch(() => {
          alert('Niepowodzenie logowania')
        })
    }
  }
}
</script>

<style scoped>
</style>
