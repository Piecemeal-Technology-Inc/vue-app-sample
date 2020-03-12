const ValidationHelper = {
  methods: {
    getValidateErrorMessageCode(errors) {
      let obj = this.getValidateErrorMessageObject(errors);

      return (obj !== null) ? obj.code : '';
    },
    getValidateErrorMessageArgs(errors) {
      let obj = this.getValidateErrorMessageObject(errors);
      return (obj !== null && obj.args) ? obj.args : [];
    },
    getValidateErrorMessageObject(errors) {
      if (!errors || errors.length < 1) {
        return null;
      }

      return JSON.parse(errors[0]);
    },
  }
}

export default ValidationHelper;