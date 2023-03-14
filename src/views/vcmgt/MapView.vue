<template>
    
    <div class="card-style">
        <l-map
            class="map-style"
            ref="map"
            :zoom="zoom"
            :center="center"
            :min-zoom="minZoom"
            :max-zoom="maxZoom"
            :max-bounds="maxBounds"
            :options="{ zoomControl: false }"
        >

            <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base">
            ></l-tile-layer>
            <l-marker :lat-lng="[11.2, 124.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[13.2, 122.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[10.2, 123.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[9.6, 122.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[15.2, 121.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[12.2, 123.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[12.2, 124.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.2, 122.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[9.2, 123.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[13.9, 121.5]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.5, 123.5]"><l-popup>This is a popup</l-popup></l-marker>
            
            <l-control-zoom :position="'topright'"/>
            <l-control-layers position="topright"/>
            <l-control-scale position="bottomleft" :metric="true" :imperial="false"></l-control-scale>
        </l-map>
        <v-card class="nav-window-style" flat>
            <v-row>
                <v-col class="pb-0">
                    <v-icon @click="showNav=!showNav" style="color: white;">mdi-menu</v-icon>
                </v-col>
            </v-row>
            <v-row v-show="showNav" >
                <v-col class="pt-1">
                    <v-card class="pa-5" flat>
                        <b>Select Type</b>
                        <v-select
                            :items="typeItems"
                            density="compact"
                            variant="outlined"
                            v-model="selectedType"
                            @input="selectItem"
                        ></v-select>

                        <b>Select Product</b>
                        <v-select
                            :items="productItems"
                            density="compact"
                            variant="outlined"
                            v-model="selectedProduct"
                        ></v-select>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LControlZoom, LControlLayers, LCircleMarker, LTooltip, LGeoJson, LControl, LControlScale } from "@vue-leaflet/vue-leaflet";


export default {
    
    components: {
        LMap,
        LTileLayer,
        LControlZoom,
        LMarker,
        LPopup,
        LControlLayers,
        LCircleMarker,
        LTooltip,
        LGeoJson,
        LControl,
        LControlScale
    },
    data() {
        return {
            showNav: false,
            isReady: false,
            zoom: 6,
            center: [12.8797, 121.7740],
            maxZoom: 17,
            maxBounds: [
                [-1.622524, 148.835926],
                [23.227101, 91.603690]
            ],
            minZoom: 5,

            tileProviders: [
                {
                    name: 'OpenStreetMap',
                    visible: false,
                    attribution:
                        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                },
                {
                    name: 'ESRI World Imagery',
                    visible: false,
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                },
                {
                    name: 'CyclOSM',
                    visible: false,
                    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
                    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                },
                {
                    name: 'OpenTopoMap',
                    visible: false,
                    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                    attribution:
                        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                },
                {
                    name: 'World Imagery',
                    visible: true,
                    url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attribution:
                        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                },

                // http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}
                // {
                //     name: 'MapBox',
                //     visible: false,
                //     url: 'https://{s}.tiles.mapbox.com/v3/[YOUR_MAPBOX_KEY]/{z}/{x}/{y}.png',
                //     attribution: '© Map tiles <a href="https://mapbox.com">Mapbox</a>'
                // }
            ],

            items: [],
            select: 'All',
            typeItems: [
                'Agricultural Sector',
                'Fishing Sector',
                'Livestock',
                'All'
            ],
            productItems: [
                
            ],

            fishProd: [
                'Bangus',
                'Crab',
                'Eel'
            ],

            agriProd: [
                'Rice',
                'Vegetable',
                'Root Crops'
            ],

            livestockProd: [
                'Pig',
                'Chicken',
                'Cow'
            ],

            selectedProduct: null,
            selectedType: null,
            
        }
    },
    watch:{
        selectedType: function(value){
            
            if(value === 'All'){
                for (let i = 0; i<3; i++){
                    this.productItems.push(this.fishProd[i])
                    this.productItems.push(this.agriProd[i])
                    this.productItems.push(this.livestockProd[i])
                }
            }
            if(value === 'Agricultural Sector'){
                this.productItems = this.agriProd
            }
            if(value === 'Fishing Sector'){
                this.productItems = this.fishProd
            }
            if(value === 'Livestock'){
                this.productItems = this.livestockProd
            }
            this.productItems.push('All')
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            for(let i=0; i<temp.length; i++){
                this.items.push(temp[i])
            }
            this.isReady = true
        },
        selectItem(item){
            console.log("jere")
            console.log(item)
        }
    }
}

</script>

<style lang="scss" scoped>
.card-style{
    margin: auto;
    width: 100%;
    height: 100%;
}
.map-style{
    z-index: 0;
    position: absolute;
    max-width: 70vw;
    max-height: 82vh;
}
.nav-window-style{
    z-index: 4;
    position: relative;
    top: 5px;
    left: 5px;
    padding: 10px;
    width: 35vh;
    background-color: transparent;
}

.navcard{
    width: 30vh;
    
}
</style>