<template>
  <v-card>
    <v-card-text>
      <div class="subheading">{{ $t(`caption['登録情報']`) }}</div>
      <hr />
      <validationObserver ref="obs">
        <div  class="pt-2">
          <ValidationProvider
            ref="provider"
            mode="lazy"
            rules="required|max:20"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="torokuJoho.name"
              :label="$t(`caption['名前']`)"
              counter="20"
              class="px-2"
              :placeholder="$t('caption[\'サンプル太郎\']')"
              :error-messages="$t(getValidateErrorMessageCode(errors), getValidateErrorMessageArgs(errors))"
              :success="valid"
            />
          </ValidationProvider>
        </div>
        <div class="px-2">
          <v-layout class="d-inline-flex">
            <v-flex>
              <v-subheader class="pl-0">{{ $t(`caption['連絡先']`) }}</v-subheader>
            </v-flex>
          </v-layout>
          <v-divider class="px-4"></v-divider>
          <div class="px-2">
            <v-layout class="pt-3" wrap>
              <v-flex xs6 class="pr-3">
                  <div class="caption grey--text">{{ $t(`caption['メールアドレス']`) }}</div>
              </v-flex>
              <v-flex xs6 class="pr-3">
                  <div class="caption grey--text">{{ $t(`caption['電話番号']`) }}</div>
              </v-flex>
            </v-layout>
            <!-- <v-divider class="px-2"></v-divider> -->
            <div>
              <ValidationObserver>
                <v-layout align-end wrap>
                  <v-flex xs6 class="pr-3">
                    <ValidationProvider
                      name="mailAddress"
                      ref="provider"
                      :rules="{
                        required: true,
                        email: true,
                        max: 256
                      }"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        v-model="torokuJoho.mailAddress"
                        :counter="256"
                        :error-messages="$t(getValidateErrorMessageCode(errors), getValidateErrorMessageArgs(errors))"
                        :success="valid"
                      />
                    </ValidationProvider>
                  </v-flex>
                  <v-flex xs6 class="pl-1">
                    <ValidationProvider
                      ref="provider"
                      :rules="{
                        required: true,
                        phone: true
                      }"
                      v-slot="{ errors, valid }"
                    >
                      <v-text-field
                        v-model="torokuJoho.phoneNo"
                        counter="16"
                        :error-messages="$t(getValidateErrorMessageCode(errors), getValidateErrorMessageArgs(errors))"
                        :success="valid"
                        placeholder="090XXXXXXXX"
                      />
                    </ValidationProvider>
                  </v-flex>
                </v-layout>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </validationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
import ValidationHelper from '@/mixins/ValidationHelper';
import {ValidationProvider, ValidationObserver} from 'vee-validate';

export default {
  name: 'NyuuryokuCard',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mixins: [ValidationHelper],
  data () {
    return {
      torokuJoho: {
        name : '',
        mailAddress:'',
        phoneNo:''
      }
    }
  },
  methods: {
    validate() {
      return this.$refs.obs.validate();
    },
    getTorokuJoho() {
      return this.torokuJoho;
    }
  }
}
</script>

<style lang="scss">
</style>
