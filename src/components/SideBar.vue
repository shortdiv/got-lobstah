<template>
  <div class="sidebar">
    <ul class="column-list">
      <li
        v-for="(dat, ind) in yelpData"
        :key="`${ind}`"
        :ref="
          dat.properties.name
            .toLowerCase()
            .split(' ')
            .join('-')
        "
      >
        <SideBarItem :place="dat.properties" />
      </li>
    </ul>
  </div>
</template>

<script>
import SideBarItem from "./SideBarItem.vue";
import { watch } from "vue-function-api";

export default {
  name: "SideBar",
  components: {
    SideBarItem
  },
  props: {
    yelpData: Array,
    focused: String
  },
  setup(props, context) {
    watch(
      () => props.focused,
      async val => {
        val = val
          .toLowerCase()
          .split(" ")
          .join("-");
        context.refs[val][0].scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 12em;
  background: white;
  top: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  ul {
    list-style: none;
    padding: 1em;
  }
  li {
    margin-bottom: 1em;
  }
}
</style>
