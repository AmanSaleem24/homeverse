console.log(mapToken, Number(long), "..", Number(lat));
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [Number(long), Number(lat)], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  "Exacy location provided after booking"
);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat([Number(long), Number(lat)])
  .setPopup(popup)
  .addTo(map);
