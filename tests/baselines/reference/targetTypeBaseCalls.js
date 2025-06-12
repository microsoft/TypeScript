//// [tests/cases/compiler/targetTypeBaseCalls.ts] ////

//// [targetTypeBaseCalls.ts]
function foo(x: (s: string) => void) { }
 
 
 
class Foo { constructor(x: (s: string) => void){} }
 
 
 
foo(function(s) { s = 5 });  // Error, can’t assign number to string
 
 
 
new Foo(function(s) { s = 5 });  // error, if types are applied correctly
 
 
 
class Bar extends Foo { constructor() { super(function(s) { s = 5 }) } }  // error, if types are applied correctly


//// [targetTypeBaseCalls.js]
function foo(x) { }
class Foo {
    constructor(x) { }
}
foo(function (s) { s = 5; }); // Error, can’t assign number to string
new Foo(function (s) { s = 5; }); // error, if types are applied correctly
class Bar extends Foo {
    constructor() { super(function (s) { s = 5; }); }
} // error, if types are applied correctly
