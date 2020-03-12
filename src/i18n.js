import Vue from 'vue'
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = require('./configs/message.json');

export const DEFAULT_LANG = 'ja';

export const enableLangs = Object.keys(messages);

export const langCodes = {
  "ja": "日本語",
  "en": "English"
};

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: messages
});

export default i18n;