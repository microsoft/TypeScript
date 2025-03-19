//// [tests/cases/compiler/overloadingOnConstants2.ts] ////

//// [overloadingOnConstants2.ts]
class C {
   private x = 1;
}
class D extends C {}
class E { 
   private y = 1;
}
function foo(x: "hi", items: string[]): D;
function foo(x: "bye", items: string[]): E;
function foo(x: string, items: string[]): C {
   return null;
}
var a: D = foo("hi", []); // D
var b: E = foo("bye", []); // E 
var c = foo("um", []); // error


//function bar(x: "hi", items: string[]): D;
function bar(x: "bye", items: string[]): E;
function bar(x: string, items: string[]): C;
function bar(x: string, items: string[]): C {
   return null;
}

var d: D = bar("hi", []); // D
var e: E = bar("bye", []); // E 
var f: C = bar("um", []); // C

//// [overloadingOnConstants2.js]
class C {
    x = 1;
}
class D extends C {
}
class E {
    y = 1;
}
function foo(x, items) {
    return null;
}
var a = foo("hi", []); // D
var b = foo("bye", []); // E 
var c = foo("um", []); // error
function bar(x, items) {
    return null;
}
var d = bar("hi", []); // D
var e = bar("bye", []); // E 
var f = bar("um", []); // C
