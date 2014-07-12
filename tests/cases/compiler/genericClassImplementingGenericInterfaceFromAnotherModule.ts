// @declaration: true
module foo {
    export interface IFoo<T> { }
}
module bar {
    export class Foo<T> implements foo.IFoo<T> { }
}
