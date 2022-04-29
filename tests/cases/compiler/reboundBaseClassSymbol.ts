interface A { a: number; }
module Foo {
    var A = 1;
    interface B extends A { b: string; } 
}