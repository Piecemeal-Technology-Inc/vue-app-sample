<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
        v-if="isShowSideMenu"
        width="250"
      >
        <v-list dense>
          <template v-for="item in this.menus">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="item.heading"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-tile v-ripple @click="item.menuClick" :key="item.messageCode">
              <v-list-tile-action>
                <v-icon color="primary">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <span>{{ $t(item.captionCode) }}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="primary"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
        height="48"
      >
        <v-toolbar-title class="ml-0 pl-0">
          <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isShowSideMenu"></v-toolbar-side-icon>
          <span>{{ $t('caption["VUEサンプル"]')  }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <div v-if="enableHelp">
              <v-icon v-on="on" large>language</v-icon>
            </div>
          </template>
          <v-list>
            <v-subheader>{{ $t('caption["言語切替"]') }}</v-subheader>
            <v-list-tile
            v-for="(menu, index) in langMenus"
            :key="index"
            @click="menu.menuClick"
            v-ripple
            >
              <v-list-tile-title>{{ $t(menu.captionCode) }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          </v-menu>
        </div>
      </v-toolbar>
      <v-content>
        <v-container fluid class="pa-3">
          <v-layout justify-center align-space-around column>
            <v-card color="primary" dark>
              <v-card-text class="py-1">
                <v-layout align-center>
                  <v-flex xs10 class="py-2">
                    <span class="title">{{ $t('caption["' + screenCaptionCode + '"]') }}</span>
                  </v-flex>
                  <v-flex xs2 class="text-xs-right">
                    <div v-if="enableHelp">
                      <v-icon large @click="isShowHelp= !isShowHelp">help</v-icon>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-expand-transition>
              <v-card v-show="enableHelp && isShowHelp">
                <v-card-text>
                  <div class="text-new-line">{{ $t('message["' + helpMessageCode.code + '"]', helpMessageCode.args) }}</div>
                </v-card-text>
              </v-card>
            </v-expand-transition>
            <div class="my-2" />
            <slot></slot>
          </v-layout>
        </v-container>
      </v-content>
      <message-dialog ref="MessageDialog"/>
      <loading-dialog ref="LoadingDialog"/>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as aTypes from '@/store/action-types'
import {langCodes as langCodes} from '@/i18n'
import MessageDialog from './MessageDialog'
import LoadingDialog from './LoadingDialog'

export default {
  props: {
    enableHelp: {
      type: Boolean,
      default: true
    },
    screenCaptionCode: {
      type: String,
      default: ''
    },
    helpMessageCode: {
      type: Object,
      default: () => { return {
        code: '',
        args: []
      }}
    }
  },
  components: {
    MessageDialog,
    LoadingDialog
  },
  data () {
    return {
      drawer: null,
      isShowHelp: true,
      menus: [],
      langMenus: []
    }
  },
  methods: {
    createMenu() {
      let menus =  [
        {
          icon: 'create',
          captionCode: 'caption["登録画面"]',
          menuClick: () => { this.moveScreen('toroku'); }
        },
        {
          icon: 'list',
          captionCode: 'caption["一覧画面"]',
          menuClick:  () => { 
            this.moveScreen('ichiran');
          }
        }
      ];

      return menus;
    },
    moveScreen(to) {
      // catchを記載することで、遷移先が現在の場合にエラーが発生するのを回避
      this.$router.push({
        name: to,
        params:{isCacheClear: true}}
      ).catch(() => {});
    },
    createLangMenu() {
      let menus =  [];

      this.enableLangs.forEach(lang => {
        let code = langCodes[lang];
        menus.push(
          {
            captionCode: `caption['${code}']`,
            menuClick: () => { this.changeLang(lang); }
          }
        );
      });

      return menus;
    },
    changeLang(lang) {
      let path = this.$route.path.replace(/^\/.+\//, '/' + lang + '/');
      this.$router.push(path).catch(() => {});
    }
  },
  computed: mapState([
    'isShowSideMenu',
    'enableLangs'
  ]),
  created() {
    this.menus = this.createMenu();
    this.langMenus = this.createLangMenu();
  },
  mounted() {
    this.$store.dispatch(aTypes.SET_MESSAGE_DIALOG, this.$refs.MessageDialog);
    this.$store.dispatch(aTypes.SET_LOADING_DIALOG, this.$refs.LoadingDialog);
  }
}
</script>

<style lang="scss">
.text-new-line {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>