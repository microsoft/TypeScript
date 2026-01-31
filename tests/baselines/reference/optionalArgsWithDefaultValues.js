//// [tests/cases/compiler/optionalArgsWithDefaultValues.ts] ////

//// [optionalArgsWithDefaultValues.ts]
function foo(x: number, y?:boolean=false, z?=0) {}

class CCC {
    public foo(x: number, y?:boolean=false, z?=0) {}
    static foo2(x: number, y?:boolean=false, z?=0) {}
}

var a = (x?=0) => { return 1; };
var b = (x, y?:number = 2) => { x; };

//// [optionalArgsWithDefaultValues.js]
function foo(x, y = false, z = 0) { }
class CCC {
    foo(x, y = false, z = 0) { }
    static foo2(x, y = false, z = 0) { }
}
var a = (x = 0) => { return 1; };
var b = (x, y = 2) => { x; };
