<template>
  <div id="app">
    <keep-alive v-if="cache">
      <router-view :style="gamenStyle" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data () {
    return {
    }
  },
	methods: {

  },
	computed: {
    cache() {
      return this.$store.state.enableCache;
    },
    gamenStyle() {
      return this.$store.state.gamenStyle;
    }
  },
  
  mounted() {
    // 初期表示時にvue-routerのafterEachイベントでopacityが反映されない為、ここで1を設定する。
    this.$store.state.gamenStyle = {opacity : 1}
  }
}
</script>

<style lang="scss">
</style>