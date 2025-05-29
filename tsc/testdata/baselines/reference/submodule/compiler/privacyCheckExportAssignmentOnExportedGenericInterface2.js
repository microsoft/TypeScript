//// [tests/cases/compiler/privacyCheckExportAssignmentOnExportedGenericInterface2.ts] ////

//// [privacyCheckExportAssignmentOnExportedGenericInterface2.ts]
export = Foo;

interface Foo<T> {
}

function Foo<T>(array: T[]): Foo<T> {
    return undefined;
}

module Foo {
    export var x = "hello";
}


//// [privacyCheckExportAssignmentOnExportedGenericInterface2.js]
"use strict";
function Foo(array) {
    return undefined;
}
(function (Foo) {
    Foo.x = "hello";
})(Foo || (Foo = {}));
module.exports = Foo;


//// [privacyCheckExportAssignmentOnExportedGenericInterface2.d.ts]
export = Foo;
interface Foo<T> {
}
declare function Foo<T>(array: T[]): Foo<T>;
declare namespace Foo {
    var x: string;
}
