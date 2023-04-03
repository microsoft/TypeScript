/// <reference path="fourslash.ts" />

//// type Foo = { a: 0, b: 'x' } | { a: 0, b: 'y' } | { a: 1, b: 'z' };
//// const foo: Foo = { a: 0, b: '/**/

verify.completions({ marker: "", triggerCharacter: "'", includes: [ "x", "y" ], excludes: [ "z" ] });