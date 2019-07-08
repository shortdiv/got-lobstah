<template>
  <div id="app">
    <BaseMap :center="center" v-slot:default="{ mapContext, loaded }">
      <template v-if="loaded">
        <SourceLayer
          :mapContext="mapContext"
          sourceId="lobstahs"
          :dataSrc="yelpData"
        />
        <FeatureLayer
          :mapContext="mapContext"
          :paint="paint"
          mapId="lobstah-places"
          sourceId="lobstahs"
          layerType="circle"
          @layer-clicked="
            e => {
              moveMap(mapContext, e);
            }
          "
        />
        <FeatureLayer
          :mapContext="mapContext"
          :paint="paintDarken"
          mapId="lobstah-selected"
          sourceId="lobstahs"
          layerType="circle"
          :focused="focused"
        />
      </template>
    </BaseMap>
    <SideBar :yelpData="yelpData.features" :focused="focused" />
  </div>
</template>

<script>
import axios from "axios";

import { state, value, onCreated } from "vue-function-api";
// import useWaypoint from "./functions/useWaypoint";

import BaseMap from "@/components/BaseMap.vue";
import SourceLayer from "@/components/SourceLayer.vue";
import FeatureLayer from "@/components/FeatureLayer.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "app",
  components: {
    BaseMap,
    SourceLayer,
    FeatureLayer,
    SideBar
  },
  setup() {
    const mapState = state({
      center: [-71.058291, 42.360253],
      zoom: 12
    });
    const focused = value("Luke's Lobster Back Bay");
    // const route = value(null)
    // const raf = value()
    const paint = {
      "circle-radius": 10,
      "circle-color": "#007cbf",
      "circle-opacity": 0.5
    };
    const paintDarken = {
      "circle-radius": 10,
      "circle-color": "#fff",
      "circle-opacity": 1
    };
    const yelpData = value({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-71.058291, 42.360253]
      }
    });
    const moveMap = (map, e) => {
      map.flyTo({ center: e.features[0].geometry.coordinates, speed: 2.0 });
      focused.value = e.features[0].properties.name;
    };
    const getYelpData = () => {
      axios
        .get("/.netlify/functions/yelp-it", {
          params: {
            location: "boston, ma",
            term: "lobster"
          }
        })
        .then(async res => {
          yelpData.value = res.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    };
    // const runnergeojson = value({
    //   "type":"Feature",
    //   "properties":{},
    //   "geometry":{
    //     "type": "Point",
    //     "coordinates":[-71.51794373989105,42.23001485466201]
    //   }
    // })
    // watch(() => route.value, val => {
    // if (val !== null) {
    //   const { waypoint } = useWaypoint(val)
    //   console.log(waypoint.value)
    //   geojson.value = waypoint.value
    // this.map.getSource('point').setData(waypoint)
    // }
    // })
    onCreated(async () => {
      // run this in a method //
      // fetch("https://gist.githubusercontent.com/shortdiv/97d74e464a8900853bc89048a8244c84/raw/e9bbb80410f798e82171dfdf453e232ef251a4fc/BostonMarathon_firstsegment.geojson")
      // .then(response => {
      //   return response.json();
      // })
      // .then(data => {
      //   route.value = data
      //   const { waypoint } = useWaypoint(data)
      // })
      getYelpData();
    });
    return {
      paint,
      paintDarken,
      yelpData,
      // runnergeojson,
      center: mapState.center,
      zoom: mapState.zoom,
      moveMap,
      focused
    };
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vw;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
}
</style>
