<template>
  <v-app class="default-font">
    <v-app-bar
      class="px-7"
      color="#6C4A3F"
      float
    >
      <v-app-bar-title class="logo font-weight-white">
        sAPPat
      </v-app-bar-title>
      
      <v-spacer/>

      <template v-for="tab in tabs">
        <v-btn color="#ffffff" class="text-uppercase" :to="tab.route">
          {{ tab.name }}
        </v-btn>
      </template>

      <!-- LOGIN - change if not authenticated -->
      <template v-if="this.$store.getters.isAuthenticated()">
        <v-btn color="#ffffff" class="text-uppercase" @click="logoutUser">
          Logout
        </v-btn>
      </template>
      <template v-else>
        <v-btn color="#ffffff" class="text-uppercase" :to="'/login'">
          Login
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid class="main-style">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data(){
    return {
      tabs: [
        {name: "About", route: "/about"},
        {name: "Contact", route: "/contact"},
        {name: "FAQ", route: "/faq"},
      ],
    }
  },
  methods: {
    logoutUser(){
      this.$store.dispatch("logoutUser")
    }
  },
  mounted: function() {
		let elHtml = document.getElementsByTagName('html')[0]
		elHtml.style.overflowY = 'auto'
	},
	destroyed: function() {
		let elHtml = document.getElementsByTagName('html')[0]
		elHtml.style.overflowY = null
	},
}
</script>

<style lang="scss" scoped>
  body{
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
    font-family: 'Nunito';
	}
	#app{
		width: 100%;
		height: 100%;
	}
  .logo{
		color: rgba(255, 255, 255, 0.6);
		letter-spacing: 5px;
		font-size: 22px;
	}
  .default-font {
		font-family: 'Raleway', sans-serif;
	}

  .main-style{
    padding-top: 3%;
    padding-left: 7%;
    padding-right: 7%;
  }
</style>
