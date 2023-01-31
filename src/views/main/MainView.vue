<template>
  <template v-if="isReady">
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
    
    <!-- <v-container class="px-0" fluid> -->
      <v-row>
        <!-- Temporary loop -->
        <v-col class="button-layout" v-for="button in buttons" lg="">
          <v-card
            class="button-style d-flex align-center justify-center"
            variant="outlined"
            rounded
            @click="buttonClick(button.link, button.name)"
          >
            <v-icon class="icon-style" size="100">{{ button.icon }}</v-icon>
          </v-card>
          <v-sheet class="text-center button-name-style"> {{ button.name }} </v-sheet>
        </v-col>
      </v-row>
    <!-- </v-container> -->
  </template>
</template>

<script>

export default {
  data(){
      return {
          role: "",
          buttons: [
            {id: 0, name: "Search", icon: "mdi-magnify", link: "search"},
            {id: 1, name: "Value Chain Data Management", icon: "mdi-graph-outline", link: "vcmgt"},
            {id: 2, name: "Report Management", icon: "mdi-file-document-outline", link: "report"},
            {id: 3, name: "Account Settings", icon: "mdi-account-cog-outline", link: "profile"},
            // {id: 4, name: "Search", icon: "mdi-search"},
          ],
          isReady: false,
          username: null,
      }
  },
  mounted(){
    this.getData()
    localStorage.setItem('breadcrumbs', null)
  },
  methods: {
    //will change this later if database is available
    getData(){
      this.username = localStorage.getItem("user_name")
      this.isReady = true;
    },
    getRole(){
      console.log(this.$store.getters.getRole())
      return this.$store.getters.getRole();
    },

    buttonClick(link, name){
      var breadcrumb = []
      var crumb = {
        title: 'Home',
        disabled: false,
        href: "/home"
      }
      breadcrumb.push(crumb)
      localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumb))
      // console.log(JSON.parse(localStorage.getItem('breadcrumbs')))
      this.$router.push('/home/' + link)
      // console.log(this.$store.getters.getBreadcrumbs())
    }
  }
}


</script>
  
<style lang="scss" scoped>
  .main-text{
    font-weight: bold;
    font-size: 30pt;
    margin-left: 20px;
  }
  .role-text{
    font-size: 20pt;
    margin-left: 20px;
  }
  .button-style{
    height: 250px;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
  }

  .icon-style{
    color: #333333;
  }

  .button-name-style{
    font-size: 15pt;
    font-weight: bold;
    color: #333333;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
  }
</style>