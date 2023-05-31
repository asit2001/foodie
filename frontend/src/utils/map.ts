import { Loader } from "@googlemaps/js-api-loader";
import { GetAddress, InitMap } from "../type";

const loader = new Loader({
  apiKey: process.env.REACT_APP_MAP_KEY!,
  version: "weekly",
  libraries: ["places", "marker"],
}).load();

export async function initMap({ mapRef, option, markerOpt }: InitMap) {
  const { Map, Marker } = (await loader).maps;
  const map = new Map(mapRef.current!, option);
  markerOpt.map = map;
  const marker = new Marker(markerOpt);
  return { map, marker };
}
export async function getAddress({ city, mapRef, callBack }: GetAddress) {
  const { Geocoder } = (await loader).maps;
  const geocoder = new Geocoder();
  const { results } = await geocoder.geocode({ address: city });
  callBack(results[0].formatted_address)
  const mapOpt = {
    center: {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng(),
    },
    zoom: 15,
  };
  const markerOpt = {
    position: mapOpt.center,
    title: "location",
  };
  const { map, marker } = await initMap({ mapRef, option: mapOpt, markerOpt });

  map.addListener("center_changed", () => {
    const latLng = {
      lat: map.getCenter()?.lat() || mapOpt.center.lat,
      lng: map.getCenter()?.lng() || mapOpt.center.lng,
    };
    marker.setPosition(latLng);
  });
  map.addListener("dragend", async () => {
    const latLng = {
      lat: map.getCenter()?.lat() || mapOpt.center.lat,
      lng: map.getCenter()?.lng() || mapOpt.center.lng,
    };
    let res = await geocoder.geocode({ location: latLng });
    callBack(res.results[0].formatted_address);
  });
}
