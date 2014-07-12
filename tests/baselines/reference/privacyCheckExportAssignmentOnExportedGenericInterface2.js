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
define(["require", "exports"], function(require, exports) {
    

    function Foo(array) {
        return undefined;
    }

    var Foo;
    (function (Foo) {
        Foo.x = "hello";
    })(Foo || (Foo = {}));
    return Foo;
});
