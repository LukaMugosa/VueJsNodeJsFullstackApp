<template>
  <div id="app">
    <v-app>
      <v-main>
        <page-header/>
        <v-container>
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/Header'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>

.input-group--text-field input {
  border-bottom: 1px solid black;
}
.toolbar__title {
  color: white;
}
.btn__content {
    color: white;
}

</style>
