<template>
  <v-row no-gutters>
    <v-sheet class="main-text">
      Hello, {{ username }}!
    </v-sheet>
  </v-row>
  <v-row no-gutters>
    <v-sheet class="role-text">
      Value Chain Analyst
    </v-sheet>
  </v-row>
  
  <v-row>
    <!-- Temporary loop -->
    <v-col class="button-layout" v-for="button in buttons" cols="3" justify="center">
      <v-card
        variant="outlined"
        class="button-style"
        @click=""
      >
        <v-icon size="x-large">{{ button.icon }}</v-icon>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props:{
    username: {
      type: String
    },
  },
  data(){
      return {
          role: "",
          buttons: [
            {id: 0, name: "Search", icon: "mdi-magnify"},
            {id: 1, name: "Value Chain Data Management", icon: "mdi-search"},
            {id: 2, name: "Search", icon: "mdi-search"},
            {id: 3, name: "Search", icon: "mdi-search"},
            {id: 4, name: "Search", icon: "mdi-search"},
          ],
      }
  },
  mounted(){

  },
  methods: {
    getRole(){
      console.log(this.$store.getters.getRole())
      return this.$store.getters.getRole();
    },
  }
}


</script>
  
<style lang="scss" scoped>
  .main-text{
    font-weight: bold;
    font-size: 30pt;
  }
  .role-text{
    font-size: 15pt;
  }
  .button-style{
    height: 250px;
    width: 250px;
    justify-self: center;
    align-content: center;
  }
</style>