<template>
  <BaseLayout
    :enableHelp="true"
    :help-message-code="{code:descriptionMessageCode}"
    screen-caption-code="詳細画面"
  >
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout align-end>
              <v-flex xs12>
                <div class="subheading">
                  {{ $t('caption["登録情報"]') }}
                </div>
              </v-flex>
            </v-layout>
            <hr />
            <v-layout>
              <v-flex xs8 sm10>
                <v-layout wrap align-center class="pt-3">
                  <v-flex xs12 sm2 class="text-left">
                    {{ $t('caption["名前"]') }}
                  </v-flex>
                  <v-flex sm10 class="text-left">
                    {{torokuJoho.name}} 
                  </v-flex>
                </v-layout>
                <v-layout wrap align-center class="pt-3">
                  <v-flex xs12 sm2 class="text-left">
                    {{ $t('caption["メールアドレス"]') }}
                  </v-flex>
                  <v-flex sm10 class="text-left">
                    <div ref="mailDiv">{{torokuJoho.mailAddress}}</div> 
                  </v-flex>
                </v-layout>
                <v-layout wrap align-center class="pt-3">
                  <v-flex xs12 sm2 class="text-left">
                    {{ $t('caption["電話番号"]') }}
                  </v-flex>
                  <v-flex sm10 class="text-left">
                    <div>{{torokuJoho.phoneNo}}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap align-center class="pt-3">
                  <v-flex xs12 sm2 class="text-left">
                    {{ $t('caption["登録日時"]') }}
                  </v-flex>
                  <v-flex sm10 class="text-left">
                    {{torokuJoho.torokuNichiji}} 
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs4 sm2 class="text-xs-right text-sm-right">
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="back">{{ $t('caption["戻る"]') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/base/BaseLayout';
import DomOperator from '@/mixins/DomOperator';
import * as aTypes from '@/store/action-types';

export default {
  name: 'Shosai',
  components: {
    BaseLayout
  },
  mixins: [
    DomOperator
  ],
  props: {
    descriptionMessageCode: {
      type: String,
      default: 'M00011'
    }
  },
  data () {
    return {
      torokuJoho: {
        name: '',
        mailAddress: '',
        phoneNo: '',
        torokuNichiji: ''
      }
    }
  },
	methods: {
    setTorokuJoho() {
      if (this.$route.params.torokuJoho) this.torokuJoho = this.$route.params.torokuJoho;
    },
    back() {
      this.$router.push({name: 'ichiran'});
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
    setTimeout(() => {
      // Edge、IE11で初期表示時にthis.$refs.mailDivが取れない為、setTimeoutで実行
      this.selectElement(this.$refs.mailDiv);
    }, 1);

    this.setTorokuJoho();

    this.$store.dispatch(aTypes.SHOW_SIDE_MENU);
  }
}
</script>

<style lang="scss">
</style>
