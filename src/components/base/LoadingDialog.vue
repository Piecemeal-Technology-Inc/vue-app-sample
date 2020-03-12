<template>
  <v-layout v-if="isShow" row justify-center>
    <v-dialog v-model="isShow" persistent max-width="500">
      <v-card>
        <v-card-text>
          <v-progress-linear :indeterminate="true" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

export default {
  name: 'LoadingDialog',
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    open () {
      this.isShow = true;
    },
    close () {
      this.isShow = false;
    },
  }
}
</script>

<style lang="scss">
</style>