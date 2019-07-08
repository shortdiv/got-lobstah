<template>
  <div class="map--wrapper">
    <div id="map" ref="map">
      <slot :mapContext="mapContext" :loaded="loaded"></slot>
    </div>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
import { value, onCreated, onMounted } from "vue-function-api";

export default {
  name: "BaseMap",
  props: {
    center: Array,
    zoom: Number
  },
  setup(props, context) {
    const mapContext = value(null);
    const loaded = value(false);
    // provide({
    //     map
    // });
    onCreated(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw";
    }),
      onMounted(() => {
        var map = new mapboxgl.Map({
          container: context.refs.map, // container id
          style: "mapbox://styles/mapbox/dark-v10", //hosted style id
          center: props.center || [-71.058291, 42.360253], // starting position
          zoom: props.zoom || 12 // starting zoom
        });
        map.on("load", () => {
          loaded.value = true;
        });
        mapContext.value = map;
      });
    return {
      mapContext,
      loaded
    };
  }
};
</script>

<style lang="scss">
@import "../assets/map.css";

body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.map--wrapper {
  height: 100%;
  width: 100%;
}

.mapboxgl-canvas {
  position: relative !important;
}
</style>
