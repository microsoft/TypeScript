'use strict';

var convert      =  require('convert-source-map');
var combine      =  require('..');

var fooComment = '//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9vLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Q0FBQTtDQUFBLENBQUEsQ0FBQSxJQUFPLEdBQUs7Q0FBWiIsInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKHJlcXVpcmUgJy4vYmFyLmpzJylcbiJdfQ==';
var barComment = '//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Q0FBQTtDQUFBLENBQUEsQ0FBQSxJQUFPLEdBQUs7Q0FBWiIsInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKGFsZXJ0ICdhbGVydHMgc3VjaycpXG4iXX0=';

var fooFile = {
    source: '(function() {\n\n  console.log(require(\'./bar.js\'));\n\n}).call(this);\n' + '\n' + fooComment
  , sourceFile: 'foo.js'
};
var barFile = {
    source: '(function() {\n\n  console.log(alert(\'alerts suck\'));\n\n}).call(this);\n' + '\n' + barComment
  , sourceFile: 'bar.js'
};

var offset = { line: 2 };
var base64 = combine
  .create('bundle.js')
  .addFile(fooFile, offset)
  .addFile(barFile, { line: offset.line + 8 })
  .base64();

var sm = convert.fromBase64(base64).toObject();
console.log(sm);
