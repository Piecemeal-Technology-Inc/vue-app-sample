const DomOperator = {
  methods: {
    selectElement(element) {
      // Rangeオブジェクトの取得
      var range = document.createRange();
      // 範囲の指定
      range.selectNodeContents(element);

      // Selectionオブジェクトを返す。ユーザが選択した範囲が格納されている
      var selection = window.getSelection();
      // 選択をすべてクリア
      selection.removeAllRanges();
      // 新規の範囲を選択に指定
      selection.addRange(range);
    }
  }
}

export default DomOperator;