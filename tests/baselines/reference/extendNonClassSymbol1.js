//// [tests/cases/compiler/extendNonClassSymbol1.ts] ////

//// [extendNonClassSymbol1.ts]
class A { foo() { } }
var x = A;
class C extends x { } // error, could not find symbol xs

//// [extendNonClassSymbol1.js]
class A {
    foo() { }
}
var x = A;
class C extends x {
} // error, could not find symbol xs
