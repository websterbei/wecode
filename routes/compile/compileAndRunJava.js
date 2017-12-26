var fs = require('fs');
var tmp = require('tmp');
var exec = require('sync-exec');

function execution(code) {
  var className = code.match('public\\s+class\\s+[^{]+{')[0].slice(0,-1).trim().split(/\s/).slice(-1)[0];
  var folder = folderCreation();
  var filename = className + '.java';
  var sourceFile = folder.name + '/' + filename;
  fs.writeFileSync(sourceFile, code);
  var result = compile(folder, filename);
  if(result) return result;
  result = runCode(folder, className);
  return result;
}

function folderCreation() {
  var tmpFolder = tmp.dirSync();
  return tmpFolder;
}

function compile(folder, filename) {
  var command = 'javac ' + folder.name + '/' + filename;
  var result = exec(command, 7000);
  if(result.status != 0) return result.stderr;
}

function runCode(folder, className) {
  var command = 'cd '+folder.name+'&&' + 'java ' + className;
  console.log(command);
  var result = exec(command, 7000);
  if(result.status != 0) return result.stderr;
  return result.stdout;
}

module.exports = execution;
