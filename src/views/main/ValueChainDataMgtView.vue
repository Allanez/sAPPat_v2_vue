<template>
    <v-breadcrumbs v-if="isReady" :items="items">
        <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
    </v-breadcrumbs>

    <v-row v-if="isReady">
        <v-col v-for="button in buttons" sm="6" md="4" lg="3">
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
</template>

<script>
import {setActiveCrumb, updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    data(){
        return {
            isReady: false,
            buttons: [
                {id: 0, name: "Graph", icon: "mdi-graph", link: ""},
                {id: 1, name: "Map", icon: "mdi-map", link: "map"}
            ],
            items: [],
        }
    },
    mounted(){
        this.setData()
    },
    methods: {
        setData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            var crumb = {
                title: 'Value Chain Data Management',
                disabled: true,
                href: '/home/vcmgt'
            }
            this.items = updateCrumbs(temp, crumb)
            console.log(this.items)
            this.isReady = true
        },

        buttonClick(link, name){
            // this.$store.commit('setCrumbActive', 'Search')
            var crumb = {
                title: name,
                disabled: true,
                href: '/home/vcmgt/map'
            }
            this.items.push(crumb)
            var temp = setActiveCrumb(this.items, 'Value Chain Data Management')
            localStorage.setItem('breadcrumbs', JSON.stringify(temp))
            // this.$store.commit('setBreadcrumb', crumb)
            this.$router.push('/home/vcmgt/' + link)
        }
    }
}
</script>

<style>
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