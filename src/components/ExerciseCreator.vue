<template>
  <div>
    <v-content>
      <v-layout row wrap>
        <v-flex xs12 md5 offset-md4>
          <v-text-field :type="text" v-model="form.title" label="Tytul" required></v-text-field>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
            <v-select :items="languages" v-model="form.language" label="Technologia" required>
              <template slot="item" slot-scope="data"> <!-- ten slot odpowiada za to jak obiekty sa wyswietlane w liscie -->
                    {{ data.item.name }}
                </template>
                <template slot="selection" slot-scope="data"> <!-- ten slot odpowiada za to jak wybrany obiekt jest wyswietlany -->
                    {{ data.item.name }}
                </template>
            </v-select>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
            <v-select :items="levels" v-model="form.level" label="Poziom zaawansowania" required>
              <template slot="item" slot-scope="data"> <!-- ten slot odpowiada za to jak obiekty sa wyswietlane w liscie -->
                    {{ data.item.name }}
                </template>
                <template slot="selection" slot-scope="data"> <!-- ten slot odpowiada za to jak wybrany obiekt jest wyswietlany -->
                    {{ data.item.name }}
                </template>
            </v-select>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
            <v-text-field :type="text" v-model="form.content" label="Tresc" required></v-text-field>
        </v-flex>
        <v-flex xs12 md4 offset-md4>
          <v-btn color="primary" @click="createExercise">Utwórz</v-btn>
        </v-flex>
      </v-layout>
    </v-content>
    <!--
        <h3>Kreator ćwiczenia</h3>
        <form>
            <input type="text" name="title" placeholder="Tytuł" v-model="form.title"/><br>
            <input type="text" name="language" placeholder="Technologia" v-model="form.language"/><br>
            <input type="text" name="level" placeholder="Poziom zaawansowania (1-3)" v-model="form.level"/><br>
            <input type="text" name="content" placeholder="Treść" v-model="form.content"/><br>
            <input type="submit" value="Utwórz" @click="createExercise"/><br>
        </form>
    -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      levels: [],
      languages: [],
      form: {
        title: '',
        language: '',
        level: '',
        content: ''
      }
    }
  },

  methods: {
    createExercise (event) {
      event.preventDefault()

      for (let field in this.form) {
        if (this.form[field] === '') {
          alert('Nie podano wszystkich danych')
          return
        }
      }

      console.log(this.form)

      this.$store.dispatch('tasks/createExercise', this.form).then(responseData => {
        alert(responseData.message)
      })
    }
  },

  created () {
    this.$store.dispatch('tasks/getLanguagesAll').then(responseData => {
      this.languages = responseData
    })

    this.$store.dispatch('tasks/getLevelsAll').then(responseData => {
      this.levels = responseData
    })
  }
}
</script>

<style scoped>
</style>
