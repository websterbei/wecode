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
  var stdin = document.getElementById('stdin').value;
  $.post({
    url: "/compileAndRun",
    data: {
      language: "java",
      code: code,
      stdin: stdin
    },
    success: function(result) {
      var stdout = document.getElementById('stdout');
      stdout.value = result;
      document.getElementById('output-tab').click();
    }
  });
}
