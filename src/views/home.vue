<template>
<section class="home-page flex align-center center column">

  <h1>Map Markers</h1>
  <GoogleMap  @click="setMarker" api-key="AIzaSyCylbi9G13oxtzsUPHKLrXG_cDvKX1jjFU" style="width: 80vw; height: 500px" :center="startPos" :zoom="10">
    <Marker v-for="m in markers" :key="m" :options="{position: m.position, clickable: true, title: m.label, label: m.label[0]}">
     <InfoWindow :options="{ position: m.position, content: m.label }" />
    </Marker>
  </GoogleMap>
  <Transition enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut animate__faster">
  <modal-cmp @saveLoc="saveLoc" v-if="addingMarker"></modal-cmp>
  </Transition>
</section>
</template>

<script>

import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { mapService } from "../services/map.service";
import modalCmp from "../components/modal-cmp.vue";
import { storageService } from '../services/storage.service';


export default {
    data(){
        return {
            startPos:{lat: 32.083563483880894, lng: 34.78291278401669},
            markers: [],
            addingMarker: false,
            latlngToAdd: null
        }
    },
    async created(){
        await this.loadMarkers()
    },
    components: {
        GoogleMap,
        Marker,
        InfoWindow,
        modalCmp
    },
    methods:{
        async loadMarkers(){
            this.markers = await mapService.getMarkers()

        },
        setMarker(e){
            this.addingMarker = true
            this.latlngToAdd = e.latLng    
        },
        async saveLoc(locTitle){
            if(!locTitle) {
                this.addingMarker = false
                return
            }
            const pos = { 
                label: locTitle,
                position: this.latlngToAdd,
            }
            await mapService.saveMarker(pos)
            await this.loadMarkers()
            this.addingMarker = false
        }
    }
}
</script>

<style>

</style>