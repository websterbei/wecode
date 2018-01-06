function changeThemeTo(button) {
  var theme = button.name;
  setEditorTheme(theme, button.innerHTML);
  setPageTheme(theme);
}

function setPageTheme(theme) {
  var colorMap = {
    solarized_light: '#FDF6E3',
    chaos: '#161616',
    xcode: '#FFFFFF',
    ambiance: '#202020'
  }
  document.getElementById('editor').style.background = colorMap[theme];
}

function setEditorTheme(theme, themeLabel) {
  document.getElementById('themeSelectDropdown').innerHTML = themeLabel;
  var prefix = "ace/theme/";
  var themePath = prefix + theme;
  editor.setTheme(themePath);
}
