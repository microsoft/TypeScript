//// [tests/cases/compiler/ambientModules.ts] ////

//// [ambientModules.ts]
declare namespace Foo.Bar { export var foo; };
Foo.Bar.foo = 5; 

//// [ambientModules.js]
;
Foo.Bar.foo = 5;
