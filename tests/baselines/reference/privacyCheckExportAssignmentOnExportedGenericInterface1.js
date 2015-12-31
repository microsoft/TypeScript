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
"use strict";
var Foo;
module.exports = Foo;


//// [privacyCheckExportAssignmentOnExportedGenericInterface1.d.ts]
declare module Foo {
    interface A<T> {
    }
}
interface Foo<T> {
}
declare var Foo: new () => Foo.A<Foo<string>>;
export = Foo;
