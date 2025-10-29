//// [tests/cases/compiler/privacyCheckExportAssignmentOnExportedGenericInterface2.ts] ////

//// [privacyCheckExportAssignmentOnExportedGenericInterface2.ts]
export = Foo;

interface Foo<T> {
}

function Foo<T>(array: T[]): Foo<T> {
    return undefined;
}

namespace Foo {
    export var x = "hello";
}


//// [privacyCheckExportAssignmentOnExportedGenericInterface2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function Foo(array) {
        return undefined;
    }
    (function (Foo) {
        Foo.x = "hello";
    })(Foo || (Foo = {}));
    return Foo;
});


//// [privacyCheckExportAssignmentOnExportedGenericInterface2.d.ts]
export = Foo;
interface Foo<T> {
}
declare function Foo<T>(array: T[]): Foo<T>;
declare namespace Foo {
    var x: string;
}
