function saveDocument() {
  var code = editor.session.getValue();
  setCookie('code', code, 3);
}

function restoreCode() {
  var code = getCookie('code');
  editor.session.setValue(code);
}

function compileAndRun() {
  var code = editor.session.getValue();
  $.post({
    url: "compileAndRun",
    data: {
      language: "java",
      code: code
    },
    success: function(result) {
      var myConsole = document.getElementById('console');
      myConsole.value = result;
    }
  });
}
