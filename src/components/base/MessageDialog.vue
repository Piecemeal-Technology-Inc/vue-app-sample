<template>
  <!-- キャッシュが有効になるとうまく表示できなくなる。非表示時にダイアログを削除して作り直すようにする。 -->
  <v-layout v-if="isShow" row justify-center>
    <v-dialog v-model="isShow" persistent max-width="500">
      <v-card :color="this.color" dark>
        <v-card-text class="float-left py-1">
          <v-icon>{{icon}}</v-icon>
          <span class="pl-3">{{ $t(`caption['${titleCaptionCode}']`) }}</span>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text class="message-new-line">{{ $t(`message['${messageCode}']`, messageArgs) }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" v-for="(button, index) in buttons" v-bind:key="index" v-on:click="button.onclick">{{ $t(`caption['${button.nameCaptionCode}']`) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

export default {
  name: 'messageCodeDialog',
  data() {
    return {

      isShow: false,
      icon: '',
      titleCaptionCode: '',
      messageCode: '',
      messageArgs: [],
      buttons:[{nameCaptionCode: 'OK', onclick: this.close}],
      color: 'primary'
    };
  },
  methods: {
    openInfo (messageCode, messageArgs, titleCaptionCode, okCallback) {
      this.icon = 'info';
      this.color = 'primary';
      this.titleCaptionCode = (titleCaptionCode) ? titleCaptionCode : '情報';
      this.messageCode = messageCode;
      this.messageArgs = messageArgs ? messageArgs : [];
      this.buttons = [{
        nameCaptionCode: 'OK',
        onclick: (okCallback) ? () => { okCallback(); this.close(); } : this.close
      }];
      this.isShow = true;
    },
    openError(messageCode, messageArgs, titleCaptionCode, okCallback) {
      this.icon = 'warning';
      this.color = 'error'
      this.titleCaptionCode = (titleCaptionCode) ? titleCaptionCode : 'エラー';
      this.messageCode = messageCode;
      this.messageArgs = messageArgs ? messageArgs : [];
      this.buttons = [{
        nameCaptionCode: 'OK',
        onclick: (okCallback) ? () => { okCallback(); this.close(); } : this.close
      }];
      this.isShow = true;
    },
    openConfirm(messageCode, messageArgs, titleCaptionCode, okCallback, cancelCallback) {
      this.icon = 'help';
      this.color = 'primary'
      this.titleCaptionCode = (titleCaptionCode) ? titleCaptionCode : '確認';
      this.messageCode = messageCode;
      this.messageArgs = messageArgs ? messageArgs : [];
      this.buttons = [
        {
          nameCaptionCode: 'OK',
          onclick: (okCallback) ? () => { okCallback(); this.close(); } : this.close
        },
        {
          nameCaptionCode: 'キャンセル',
          onclick: (cancelCallback) ? () => { cancelCallback(); this.close(); }  : this.close
        }
      ];
      this.isShow = true;
    },
    close () {
      this.isShow = false;
    },
  }
}
</script>

<style lang="scss">
.message-new-line {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>