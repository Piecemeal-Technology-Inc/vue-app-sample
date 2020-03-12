<template>
    <v-tooltip v-model="visible" :absolute="true">
      <span id="free-tooltip">{{ text }}</span>
    </v-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
  },
  data() {
    return {
      visible: false,
      obj: null,
      config:{
        captionCode: '詳細表示',
        offsetX : 20,
        offsetY : 20
      }
    }
  },
  computed: {
    text: function () {
      return this.$t(`caption['${this.config.captionCode}']`);
    }
  },
  methods: {
    show(e) {
      this.obj.style.left = e.pageX + this.config.offsetX + "px";
      this.obj.style.top = e.pageY + this.config.offsetY + "px";
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  mounted() {
    // v-tooltipのposition-yが効かないので、DOM操作してツールチップの位置を補正する
    this.obj = document.querySelector('#free-tooltip').parentNode;
  }
}
</script>

<style lang="scss">
</style>
