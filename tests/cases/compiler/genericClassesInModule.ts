// @declaration: true

namespace Foo {

    export class B<T>{ }

    export class A { }
}

var a = new Foo.B<Foo.A>();