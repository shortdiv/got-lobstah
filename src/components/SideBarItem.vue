<template>
  <div class="column-item">
    <div class="column-item--img"></div>
    <div class="column-item--title">
      <h3>{{ place.name }}</h3>
    </div>
    <div class="column-item--universal-rating">
      <star-rating
        :rating="place.rating"
        :increment="0.5"
        :star-size="20"
        :read-only="true"
        text-class="custom-text"
      />
      <span class="universal-ratings--total">
        {{ place.review_count }} Reviews on Yelp
      </span>
    </div>
    <div class="column-item--indiv-rating">
      <span>
        My Rating
      </span>
      <star-rating
        :rating="3"
        :increment="0.5"
        :star-size="20"
        active-color="#9c0000"
      >
      </star-rating>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    place: Object
  }
};
</script>

<style lang="scss">
.vue-star-rating {
  position: relative;
  margin: 0 auto;
}
.column {
  &-item {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 10px;
    &--title {
      margin: 0.25em;
    }
    &--universal-rating {
      padding: 0 12px 12px 12px;
      font-size: 13px;
      &:before {
        content: "";
        border-top: 1px solid #000;
        display: block;
        margin: 10px;
      }
    }
  }
}
</style>
