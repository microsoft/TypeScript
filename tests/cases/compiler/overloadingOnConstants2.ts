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