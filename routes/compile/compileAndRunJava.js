var fs = require('fs');
var tmp = require('tmp');
var exec = require('sync-exec');

function execution(code) {
  var folder = folderCreation();
  var filename = "Solution.java";
  var sourceFile = folder.name + '/' + filename;
  fs.writeFileSync(sourceFile, code);
  var result = compile(folder, filename);
  if(result) return result;
  result = runCode(folder, filename);
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

function runCode(folder, filename) {
  var binary = filename.split('.')[0];
  var command = 'cd '+folder.name+'&&' + 'java ' + binary;
  console.log(command);
  var result = exec(command, 7000);
  if(result.status != 0) return result.stderr;
  return result.stdout;
}

module.exports = execution;
