/// <reference path="fourslash.ts" />

//// type Foo = { a: 0, b: 'x' } | { a: 0, b: 'y' } | { a: 1, b: 'z' };
//// const foo: Foo = { a: 0, b: '/*1*/' }
////
//// type Bar = { a: 0, b: 'fx' } | { a: 0, b: 'fy' } | { a: 1, b: 'fz' };
//// const bar: Bar = { a: 0, b: 'f/*2*/' }
verify.completions({ marker: "1", triggerCharacter: "'", includes: [ "x", "y" ], excludes: [ "z" ] });
verify.completions({ marker: "2", triggerCharacter: "'", includes: [ "fx", "fy" ], excludes: [ "fz" ] });