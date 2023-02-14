<template>
    <div v-if="isReady" class="search-style">
        <v-row>
            <div class="title-style">
                sAPPat
            </div>
        </v-row>
        <br/><br/>
        <v-row class="pt-5 select-style">
            <v-col cols="3">
                <v-select
                    :items="sectorItems"
                    label="Sector"
                    density="compact"
                    variant="outlined"
                    v-model="selectedSector"
                ></v-select>
            </v-col>
            <v-col cols="3">
                <v-select
                    :items="locationItems"
                    label="Location"
                    density="compact"
                    variant="outlined"
                    v-model="selectedLocation"
                ></v-select>
            </v-col>
            <v-col cols="3">
                <v-select
                    :items="productItems"
                    label="Products"
                    density="compact"
                    variant="outlined"
                    v-model="selectedProduct"
                ></v-select>
            </v-col>
            <v-col cols="3">
                <v-select
                    :items="vcplayerItems"
                    label="VC Player"
                    density="compact"
                    variant="outlined"
                    v-model="selectedVCP"
                ></v-select>
            </v-col>
        </v-row>
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
        padding-left: 10%;
        padding-right: 10%;
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