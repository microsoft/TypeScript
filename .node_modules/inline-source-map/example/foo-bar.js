var generator = require('..');

var gen = generator()
  .addMappings('foo.js', [{ original: { line: 2, column: 3 } , generated: { line: 5, column: 10 } }], { line: 5 })
  .addGeneratedMappings('bar.js', 'var a = 2;\nconsole.log(a)', { line: 23, column: 22 });

console.log('base64 mapping', gen.base64Encode());
console.log('inline mapping url', gen.inlineMappingUrl());
