//@module: commonjs
//@declaration: true
namespace Foo {
    export interface A<T> {
    }
}
interface Foo<T> {
}
var Foo: new () => Foo.A<Foo<string>>;
export = Foo;