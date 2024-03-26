const busStops = [];
const markers = [];
//add your own access token: mapboxgl.accessToken = 'YOUR TOKEN HERE'
mapboxgl.accessToken = ''


async function run() {
  const locations = await getBusLocation();
  console.log(new Date());
  console.log(locations);

  setTimeout(run, 30000);
  
}

async function getBusLocation () {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=93&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}
run();

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/acnyc/cltuh0qds002k01noa5pw514m',
  center: [-71.060881649, 42.37329872],
  zoom: 14,
});

let marker = new mapboxgl.Marker().setLngLat([-71.060881649, 42.37329872]).addTo(map);

// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}

