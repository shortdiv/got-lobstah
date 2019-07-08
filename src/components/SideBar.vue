<template>
  <div class="sidebar">
    <ul class="column-list" v-if="ratings">
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
        <SideBarItem
          :place="dat.properties"
          :rating="calcRating(dat.properties.name)"
          @rating-selected="updateRating"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SideBarItem from "./SideBarItem.vue";
import { value, watch, onCreated } from "vue-function-api";

import useFauna from "../functions/useFauna";

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
    const ratings = value([]);
    const faunaFuncs = value({});

    const updateRating = rating => {
      const ref = ratings.value[rating.place]
        ? ratings.value[rating.place].ref
        : null;
      faunaFuncs.value.setRating(ref)(rating);
    };
    const fetchRatings = async () => {
      let ratings = {};
      const lists = await faunaFuncs.value.getRatings();
      lists.map(item => {
        ratings[item.data.place] = {
          rating: item.data.rating,
          ref: item.ref.value.id
        };
      });
      return ratings;
    };
    const calcRating = name => {
      return ratings.value[name] ? ratings.value[name].rating : null;
    };
    watch(
      () => props.focused,
      async val => {
        if (Object.keys(context.refs).length) {
          val = val
            .toLowerCase()
            .split(" ")
            .join("-");
          context.refs[val][0].scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    );
    onCreated(async () => {
      const { getRatings, setRating } = await useFauna();

      faunaFuncs.value = {
        getRatings,
        setRating
      };
      const lists = await fetchRatings();
      ratings.value = lists;
    });
    return {
      updateRating,
      calcRating,
      ratings
    };
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
