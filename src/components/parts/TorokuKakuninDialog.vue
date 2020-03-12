<template>
  <div v-if="isShowDialog">
    <v-dialog v-model="isShowDialog" persistent max-width="1024">
      <v-card
        color="primary"
        dark
        height="48"
      >
        <v-card-text class="title">
          {{ $t('caption["登録確認"]') }}
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <div class="text-new-line">{{ $t('message["M00006"]') }}</div>
          <br />
          <div class="subheading">{{ $t('caption["登録情報"]') }}</div>
          <hr />
          <v-layout align-center class="pt-2">
            <v-flex xs2>
              {{ $t('caption["名前"]') }}
            </v-flex>
            <v-flex xs10>
              {{torokuJoho.name}} 
            </v-flex>
          </v-layout>
          <v-layout wrap align-start class="pt-2">
            <v-flex xs2>
              {{ $t('caption["連絡先"]') }}
            </v-flex>
            <v-flex xs10>
              <v-layout>
                <v-flex xs6 class="caption pr-4">
                  <span class="grey--text">{{ $t('caption["メールアドレス"]') }}</span>
                </v-flex>
                <v-flex xs6 class="caption">
                  <span class="grey--text">{{ $t('caption["電話番号"]') }}</span>
                </v-flex>
              </v-layout>
              <v-layout class="pt-2">
                <v-flex xs6 class="pr-4" style="overflow-wrap: break-word; line-height: 1;">
                  {{ torokuJoho.mailAddress }}
                </v-flex>
                <v-flex xs6>
                  {{ torokuJoho.phoneNo }}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

        </v-card-text>
        <v-card-actions>
          <v-btn flat color="primary" v-on:click="callbackCancelBtn">{{ $t('caption["キャンセル"]') }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn small color="primary" v-on:click="callbackRegistBtn">{{ $t('caption["登録"]') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'TorokuKakuninDialog',
  components: {
  },
  props: {

    /**
     * キャンセルボタンのコールバック処理
     * @type {function}
     */
    callbackCancelBtn: {
      type: Function,
      default:() => {}
    },
    /**
     * 登録ボタンのコールバック処理
     * @type {function}
     */
    callbackRegistBtn: {
      type: Function,
      default:() => {}
    },
    /**
     * 登録情報
     * @type {object}}
     */
    torokuJoho: {
      type: Object,
      default: () => {
        return {
          name: '',
          mailAddress: '',
          phoneNo: ''
        }
      }
    }
  },
  data () {
    return {
      /**
       * ダイアログ表示状態
       * @type {boolean}
       */
      isShowDialog: false,
    }
  },
	methods: {
    /**
     * オープン<br />
     * 登録確認ダイアログを開く。
     */
    open() {
      this.isShowDialog = true;
    },
    /**
     * クローズ<br />
     * 登録確認ダイアログを閉じる。（非表示にする。）
     */
    close() {
      this.isShowDialog = false;
    }
  }
}
</script>

<style lang="scss">
</style>
