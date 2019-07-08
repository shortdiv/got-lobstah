<script>
import { onMounted } from "vue-function-api";

export default {
  name: "SourceLayer",
  props: {
    mapContext: {
      type: Object,
      required: true
    },
    sourceId: String,
    dataSrc: [String, Object]
  },
  setup(props) {
    onMounted(() => {
      props.mapContext.addSource(props.sourceId, {
        type: "geojson",
        data: props.dataSrc
      });
    });
    // watch(() => props.dataSrc, async (dataSrc) => {
    //   if (props.mapContext.getSource(props.sourceId) !== undefined) {
    //     props.mapContext.getSource(props.sourceId).setData(dataSrc)
    //   }
    // })
  },
  render(h) {
    return h("div", this.$slots.default);
  }
};
</script>
