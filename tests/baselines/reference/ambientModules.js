//// [ambientModules.ts]
declare module Foo.Bar { export var foo; };
Foo.Bar.foo = 5; 

//// [ambientModules.js]
;
Foo.Bar.foo = 5;
