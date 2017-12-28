function saveDocument() {
  var code = editor.session.getValue();
  setCookie('code', code, 3);
  console.log(code);
}

function restoreCode() {
  var code = getCookie('code');
  console.log(code);
  editor.session.setValue(code);
}

function compileAndRun() {
  var code = editor.session.getValue();
  var stdin = document.getElementById('stdin').value;
  $.post({
    url: "compileAndRun",
    data: {
      language: "java",
      code: code,
      stdin: stdin
    },
    success: function(result) {
      var stdout = document.getElementById('stdout');
      stdout.value = result;
    }
  });
}
