// @target: es2015
// @declaration: true
namespace foo {
    export interface IFoo<T> { }
}
namespace bar {
    export class Foo<T> implements foo.IFoo<T> { }
}
