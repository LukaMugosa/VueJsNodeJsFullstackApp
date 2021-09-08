<template>
  <v-toolbar fixed class="cyan" dark>

  <v-toolbar-title class="mr-4">
      <span @click="navigateTo({to: '/'})"
        class="home"
      >
        TabTracker
      </span>
    </v-toolbar-title>
<!--    <v-toolbar-items>-->
<!--      <v-btn flat class="cyan">-->
<!--        Browser-->
<!--      </v-btn>-->
<!--    </v-toolbar-items>-->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text elevation-0 dark class="cyan"
        @click="navigateTo({to: 'register'})"
      >
        Sign Up
      </v-btn>
      <v-btn text elevation-0 dark class="cyan"
        @click="navigateTo({to: 'login'})"
      >
        Login
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route.to)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: black;
}
.v-btn--is-elevated{
  box-shadow: 0 0;
}
</style>
