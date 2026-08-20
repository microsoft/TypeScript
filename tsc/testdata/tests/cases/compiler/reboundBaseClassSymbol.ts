// @target: es2015
interface A { a: number; }
namespace Foo {
    var A = 1;
    interface B extends A { b: string; } 
}