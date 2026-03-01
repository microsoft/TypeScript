/// <reference path="fourslash.ts" />

//// type Foo = { a: 0, b: 'x' } | { a: 0, b: 'y' } | { a: 1, b: 'z' };
//// const foo: Foo = { a: 0, b: '/*1*/' }
////
//// type Bar = { a: 0, b: 'fx' } | { a: 0, b: 'fy' } | { a: 1, b: 'fz' };
//// const bar: Bar = { a: 0, b: 'f/*2*/' }
////
//// type Baz = { x: 0, y: 0, z: 'a' } | { x: 0, y: 1, z: 'b' } | { x: 1, y: 0, z: 'c' } | { x: 1, y: 1, z: 'd' };
//// const baz1: Baz = { z: '/*3*/' };
//// const baz2: Baz = { x: 0, z: '/*4*/' };
//// const baz3: Baz = { x: 0, y: 1, z: '/*5*/' };
//// const baz4: Baz = { x: 2, y: 1, z: '/*6*/' };
verify.completions({ marker: "1", triggerCharacter: "'", includes: [ "x", "y" ], excludes: [ "z" ] });
verify.completions({ marker: "2", triggerCharacter: "'", includes: [ "fx", "fy" ], excludes: [ "fz" ] });
verify.completions({ marker: "3", triggerCharacter: "'", includes: [ "a", "b", "c", "d" ] });
verify.completions({ marker: "4", triggerCharacter: "'", includes: [ "a", "b" ], excludes: [ "c", "d" ] });
verify.completions({ marker: "5", triggerCharacter: "'", includes: [ "b" ], excludes: [ "a", "c", "d" ] });
verify.completions({ marker: "6", triggerCharacter: "'", includes: [ "b", "d" ], excludes: [ "a", "c" ] });
