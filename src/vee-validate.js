import { extend, configure, setInteractionMode } from "vee-validate";
import { required, email, max } from "vee-validate/dist/rules";

setInteractionMode('custom', () => {
  return { on: ['blur'] };
});

configure({
  mode: 'custom'
});

// requiredをカスタマイズ
required.message = () => JSON.stringify({code: 'message.M00007'});

// maxをカスタマイズ
max.message = (_, values) => JSON.stringify({code: 'message.M00008', args: [values.length]});

// emailをカスタマイズ
email.message = () => JSON.stringify({code: 'message.M00009'});

// 電話番号検証処理の定義
const phone = {
  validate: (value) => {
    let regex = "";
    if (value.startsWith("+")) {
        // 国際電話番号
        regex = /^\+[1-9]{1}[0-9]{1,14}$/;
    }
    else {
        // 国内電話番号
        regex = /^((0[0-9]{1}0[0-9]{8})|(0[0-9]{9}))$/;
    }
    return value.match(regex);
  },
  message: () => JSON.stringify({code: 'message.M00010'}) //i18n.t('message.M00015W')
}

// 有効にする検証処理
extend("required", required);
extend("email", email);
extend("max", max);
extend("phone", phone);
