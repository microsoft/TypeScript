//// [privacyCheckExportAssignmentOnExportedGenericInterface1.ts]
module Foo {
    export interface A<T> {
    }
}
interface Foo<T> {
}
var Foo: new () => Foo.A<Foo<string>>;
export = Foo;

//// [privacyCheckExportAssignmentOnExportedGenericInterface1.js]
var Foo;
module.exports = Foo;
