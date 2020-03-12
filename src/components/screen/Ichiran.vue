<template>
  <BaseLayout :enable-help="true" :help-message-code="{code: 'M00005'}" screen-caption-code="一覧画面">
    <v-card>
      <v-card-text>
        <div class="subheading">{{ $t('caption["検索条件"]') }}</div>
        <hr>
        <ValidationObserver ref="obs">
          <v-layout class="pt-2 d-flex-inline" align-center >
            <v-flex xs6 class="px-2">
              <ValidationProvider
                ref="provider"
                rules="max:20"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  :label="$t('caption[\'名前\']')"
                  v-model="name"
                  :error-messages="$t(getValidateErrorMessageCode(errors), getValidateErrorMessageArgs(errors))"
                  :success="valid"
                  counter="20"
                />
              </ValidationProvider>
            </v-flex>
            <v-flex xs-6 class="text-xs-right">
                <v-btn small color="primary" :disabled="!name" v-on:click="search">{{ $t('caption["検索"]') }}</v-btn>
            </v-flex>
          </v-layout>
        </ValidationObserver>
      </v-card-text>
    </v-card>
    <div class="my-2" />
    <v-card>
      <v-card-text>
        <div class="subheading">
          {{ $t('caption["一覧"]') }}
        </div>
        <hr>
        <div class="pt-2 px-2">
          <v-tabs
            v-model="activeTabIndex"
            class="elevation-1"
            color="accent"
            dark
            @change="loadData"
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
            <v-tab>
              <v-icon>people</v-icon>
              <span class="pl-1">{{ $t('caption["全データ"]') }}</span>
            </v-tab>
            <v-tab>
              <v-icon>person</v-icon>
              <span class="pl-1">{{ $t('caption["マイデータ"]') }}</span>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTabIndex" class="elevation-1">
            <v-tab-item class="pa-3">
              <JohoList
                :enableDeleteButton="false"
                :listData="dataList[0].data"
                :selectRow="select"
              />
            </v-tab-item>
            <v-tab-item class="pa-3">
              <JohoList
                :enableDeleteButton="true"
                :listData="dataList[1].data"
                :selectRow="select"
                :deleteRow="deleteData"
              />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card-text>
    </v-card>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/base/BaseLayout'
import * as aTypes from '@/store/action-types'
import ValidationHelper from '@/mixins/ValidationHelper'
import {ValidationProvider, ValidationObserver} from "vee-validate";
import JohoList from '@/components/parts/JohoList'
import * as c from '@/const';

export default {
  name: 'Ichiran',
  components: {
    BaseLayout,
    ValidationProvider,
    ValidationObserver,
    JohoList
  },
  mixins: [ValidationHelper],
  data () {
    return {
      activeTabIndex: 0,
      name: '',
      dataList: [
        {init: false, data: [], searchMode:c.SearchMode.ALL},
        {init: false, data: [], searchMode:c.SearchMode.SELF}
      ]
    }
  },
	methods: {
    search() {
      this.$refs.obs.validate().then((valid) => {
        if (!valid) {
          this.$store.state.messageDialog.openInfo('M00012');
          return;
        }

        let params = {
          mode: this.dataList[this.activeTabIndex].searchMode,
          name: this.name
        }
        this.$axios.get('/joho', { params }).then (response => {
          this.dataList[this.activeTabIndex].data = response.data;
        });
      });
    },
    deleteData(index, data) {
      this.$store.state.messageDialog.openConfirm('M00002', [], '', () => {
        this.$axios.delete('/joho/' + data.id).then(() => {
          let index = -1;
          for (let i = 0; i < this.dataList[this.activeTabIndex].data.length; i++) {
            if (this.dataList[this.activeTabIndex].data[i].id == data.id) {
              index = i;
              break;
            }
          }

          this.dataList[this.activeTabIndex].data.splice(index, 1);
        });
      });
    },
    select(selectedItem){
      this.$router.push({
        name:'shosai',
        params: {
          torokuJoho: selectedItem
        }
      });
    },
    loadData() {
      if (!this.dataList[this.activeTabIndex].init) {
        let params = {
          mode: this.dataList[this.activeTabIndex].searchMode
        }
        this.$axios.get('/joho', { params }).then (response => {
          this.dataList[this.activeTabIndex].data = response.data;
          this.dataList[this.activeTabIndex].init = true;
        });
      }
    }
  },
  created : function() {
  },
  mounted : function () {
    this.loadData();
  },
  activated() {
    this.$store.dispatch(aTypes.SHOW_SIDE_MENU);
  }
}
</script>

<style lang="scss">
</style>
