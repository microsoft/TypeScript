//// [tests/cases/compiler/declFileExportAssignmentOfGenericInterface.ts] ////

//// [declFileExportAssignmentOfGenericInterface_0.ts]

interface Foo<T> {
    a: string;
}
export = Foo;

//// [declFileExportAssignmentOfGenericInterface_1.ts]
import a = require('declFileExportAssignmentOfGenericInterface_0');
export var x: a<a<string>>;
x.a;

//// [declFileExportAssignmentOfGenericInterface_0.js]
define(["require", "exports"], function (require, exports) {
});
//// [declFileExportAssignmentOfGenericInterface_1.js]
define(["require", "exports"], function (require, exports) {
    exports.x;
    exports.x.a;
});


//// [declFileExportAssignmentOfGenericInterface_0.d.ts]
interface Foo<T> {
    a: string;
}
export = Foo;
//// [declFileExportAssignmentOfGenericInterface_1.d.ts]
export declare var x: a<a<string>>;


//// [DtsFileErrors]


==== tests/cases/compiler/declFileExportAssignmentOfGenericInterface_1.d.ts (1 errors) ====
    export declare var x: a<a<string>>;
                          ~~~~~~~~~~~~
!!! Cannot find name 'a'.
    
==== tests/cases/compiler/declFileExportAssignmentOfGenericInterface_0.d.ts (0 errors) ====
    interface Foo<T> {
        a: string;
    }
    export = Foo;
    