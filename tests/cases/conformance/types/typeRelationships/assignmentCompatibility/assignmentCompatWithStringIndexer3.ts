// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

var a: A;
var b1: { [x: string]: string; }
a = b1; // error
b1 = a; // error

module Generics {
    class A<T extends Derived> {
        [x: string]: T;
    }
   
    function foo<T extends Derived>() {
        var a: A<T>;
        var b: { [x: string]: string; }
        a = b; // error
        b = a; // error
    }
}