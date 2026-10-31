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

//// [declFileExportAssignmentOfGenericInterface_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x.a;


//// [declFileExportAssignmentOfGenericInterface_1.d.ts]
import a = require('declFileExportAssignmentOfGenericInterface_0');
export declare var x: a<a<string>>;
