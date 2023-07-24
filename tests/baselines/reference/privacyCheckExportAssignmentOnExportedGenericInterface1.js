//// [tests/cases/compiler/privacyCheckExportAssignmentOnExportedGenericInterface1.ts] ////

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
declare namespace Foo {
    interface A<T> {
    }
}
interface Foo<T> {
}
declare var Foo: new () => Foo.A<Foo<string>>;
export = Foo;
