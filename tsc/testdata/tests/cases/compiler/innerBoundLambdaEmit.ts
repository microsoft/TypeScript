// @target: es2015
namespace M {
    export class Foo {
    }
    var bar = () => { };
}
interface Array<T> {
    toFoo(): M.Foo
}
