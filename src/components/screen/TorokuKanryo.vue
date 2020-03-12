<template>
  <BaseLayout :enableHelp="false" screen-caption-code="登録完了">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <div class="text-new-line">{{ $t(`message['M00003']`) }}</div>
            <br />
            <v-layout align-end>
              <v-flex xs12>
                <div class="subheading">
                  {{ $t('caption["登録情報"]') }}
                </div>
              </v-flex>
            </v-layout>
            <hr />
            <v-layout>
              <v-flex xs12 sm10>
                <v-layout align-center class="pt-2">
                  <v-flex xs2>
                    {{ $t('caption["名前"]') }}
                  </v-flex>
                  <v-flex xs10>
                    {{ torokuJoho.name }} 
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
                        <div>{{ torokuJoho.phoneNo }}</div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap align-center class="pt-2">
                  <v-flex xs12 sm2 class="text-left">
                    {{ $t('caption["登録日時"]') }}
                  </v-flex>
                  <v-flex sm10 class="text-left">
                    {{ torokuJoho.torokuNichiji }} 
                  </v-flex>
                </v-layout>
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
import * as aTypes from '@/store/action-types';

export default {
  name: 'TorokuKanryo',
  components: {
    BaseLayout
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
      this.torokuJoho = this.$route.params;
    },
    back : function () {
      this.$router.push({name: 'toroku'});
    }
  },
  activated() {
    this.$store.dispatch(aTypes.SHOW_SIDE_MENU);
    this.setTorokuJoho();
  }
}
</script>

<style lang="scss">
</style>
