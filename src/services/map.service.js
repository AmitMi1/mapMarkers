import { storageService } from "./storage.service"

export const mapService = {
    getMarkers,
    saveMarker

}

const KEY = 'locationsDb'

_createMarkers()
// var gMarkers = []

async function getMarkers() {
    return await storageService.query(KEY)
}

async function saveMarker(marker) {
    await storageService.post(KEY, marker)
}

async function _createMarkers() {
    var markers = await storageService.query(KEY)
    if (!markers.length) {
        markers = [
            {
                label: 'Tel Aviv',
                position: {
                    lat: 32.083563483880894, lng: 34.78291278401669
                },
                id: 'dghsak323'
            },
            {
                label: 'Home',
                position: {
                    lat: 31.958159299371587, lng: 34.807559072756284
                },
                id: 'fdmanklk23'
            },
        ]
        await storageService.postMany(KEY, markers)
    }
}