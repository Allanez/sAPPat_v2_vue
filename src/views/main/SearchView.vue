<template>
    <div v-if="isReady" class="search-style">
        <v-row>
            <div class="title-style">
                sAPPat
            </div>
        </v-row>
        <br/><br/>
        <v-row class="pt-5 select-style">
            <v-btn-toggle
                v-model="toggle"
                multiple
            >   
                <v-col
                    class="d-flex align-center justify-center"
                    v-for="filter in filters"
                    cols="3"
                >
                    <v-btn class="btn-style" :value="filter.col_name" variant="outlined">{{ filter.name }}</v-btn>

                </v-col>
            </v-btn-toggle>
        </v-row>
        <br/><br/>
        <v-row>
            <v-text-field
                hide-details="auto"
                variant="outlined"
                rounded
                append-inner-icon="mdi-magnify"
                class="searchbox-style"
                v-model="searchString"
            ></v-text-field>
        </v-row>
    </div>
</template>

<script>
import {updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    emits: ["activeView"],
    data(){
        return {
            isReady: false,
            selectedSector: null,
            selectedLocation: null,
            selectedProduct: null,
            selectedVCP: null,
            searchString: null,

            sectorItems: [],
            locationItems: [],
            productItems: [],
            vcplayerItems: [],

            filters: [
                {id: 0, name: 'Sector', enabled: false, col_name: 'sector'},
                {id: 1, name: 'Location', enabled: false, col_name: 'location'},
                {id: 2, name: 'Products', enabled: false, col_name: 'products'},
                {id: 3, name: 'VC Player', enabled: false, col_name: 'vcplayer'}
            ],

            toggle: [],
        }
    },
    mounted(){
        this.activeView()
        this.isReady=true
    },
    methods: {
        setData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            var crumb = {
                title: 'Search',
                disabled: true,
                href: '/home/search'
            }
            this.items = updateCrumbs(temp, crumb)
            this.isReady = true
        },

        activeView(){
            this.$emit('activeView', this.viewName)
        },

        onClick(id){
            console.log(id)
            this.filters[id].enabled = !this.filters[id].enabled
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .search-style{
        margin-top: 10vh;
        padding-left: 5%;
        padding-right: 5%;
    }
    .select-style{
        justify-content: center;
    }
    .btn-style{
        padding-top: 5%;
        padding-bottom: 5%;
        width: 100%;
    }
    .title-style{
        font-weight: bold;
        font-size: 3em;
        color: #6C4A3F;
        margin: auto;
    }
    .searchbox-style{
        border-radius: 10px;
    }
</style>