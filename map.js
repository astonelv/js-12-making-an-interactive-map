let myMap;
let markers = [];

async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}
console.log(getCoords())

async function createMap(){
    let coords = await getCoords();
    myMap = L.map('map').setView(coords, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);


const marker = L.marker(coords).addTo(myMap)
marker.bindPopup('<p1><b> You are Here. </b></p1>').openPopup()
}
createMap()


async function search() {
  let userLocation= await getCoords()
  let businessType = document.getElementById('select-body')

  businessType.addEventListener('change', async (event) => {
    markers.forEach(marker => myMap.removeLayer(marker))
    markers = [];

    let userChoice = event.target.value;
    try{
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3ffi/8CyAl0LRJEz8+5TWf4I2wWFGVLhmLBbFxhcXB7E='
        }
      };
     let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userChoice}&11=${userLocation}&limit=5`, options)
     let data = await response.json();
     console.log(data)

    let locations = data.results.map(result =>({
      name: result.name,
      latlng: [result.geocodes.main.latitude, result.geocodes.main.longitude],
    }))
    console.log(locations)

    locations.forEach(location => {
      let marker = L.marker(location.latlng).addTo(myMap)
      marker.bindPopup(`${location.name} `).openPopup();
      markers.push(marker);async function search() {
        let userLocation= await getCoords()
        let businessType = document.getElementById('select-body')
      
        businessType.addEventListener('change', async (event) => {
          markers.forEach(marker => myMap.removeLayer(marker))
      
          let userChoice = event.target.value;
          try{
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'fsq3ffi/8CyAl0LRJEz8+5TWf4I2wWFGVLhmLBbFxhcXB7E='
              }
            };
           let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userChoice}&11=${userLocation}&limit=5`, options)
           let data = await response.json();
           console.log(data)
      
          let locations = data.results.map(result =>({
            name: result.name,
            latlng: [result.geocodes.main.latitude, result.geocodes.main.longitude],
          }))
          console.log(locations)
      
          locations.forEach(location => {
            let marker = L.marker(location.latlng).addTo(myMap)
            marker.bindPopup(`${location.name}`).openPopup();
            markers.push(marker)
          })
      
          }
          catch(error){
            console.log("Fetch Error", error)
          }
        })
      }
      
      search()
    })

    }
    catch(error){
      console.log("Fetch Error", error)
    }
  })
}
search()