<template>
  <BaseLayout :enable-help="true" :help-message-code="{code: 'M00004'}" screen-caption-code="登録画面">
    <NyuryokuCard ref="NyuryokuCard" />

    <v-btn
      dark
      fab
      bottom
      right
      fixed
      color="primary"
      @click="confirmToroku"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <TorokuKakuninDialog
      :callbackCancelBtn="this.closeKakuninDialog"
      :callbackRegistBtn="registData"
      :torokuJoho="torokuJoho"
      ref="TorokuKakuninDialog" />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/base/BaseLayout';
import NyuryokuCard from '@/components/parts/NyuryokuCard';
import TorokuKakuninDialog from '@/components/parts/TorokuKakuninDialog';
import * as aTypes from '@/store/action-types';

export default {
  name: 'Toroku',
  components: {
    BaseLayout,
    NyuryokuCard,
    TorokuKakuninDialog
  },
  data () {
    return {
      isShowKakuninDialog: false,
      torokuJoho: {
        name: '',
        mailAddress: '',
        phoneNo: '',
        torokuNichiji: ''
      }
    }
  },
	methods: {
    confirmToroku: function () {
      this.$refs.NyuryokuCard.validate().then((valid) => {
        if (!valid) {
          this.$store.state.messageDialog.openInfo('M00012');
          return;
        }

        this.torokuJoho = this.$refs.NyuryokuCard.getTorokuJoho();

        this.$refs.TorokuKakuninDialog.open();
      });
    },
    closeKakuninDialog: function () {
      this.$refs.TorokuKakuninDialog.close();
    },
    registData: function () {
      let params = this.torokuJoho;

      this.$axios.post('/joho', params).then (response => {
        let torokuJoho = response.data;
        this.$refs.TorokuKakuninDialog.close();
        this.$router.push({
          name: 'kanryo',
          params: torokuJoho
        });
      })
    }
  },
  activated() {
    this.$store.dispatch(aTypes.SHOW_SIDE_MENU);
  }
}
</script>

<style lang="scss">
</style>
