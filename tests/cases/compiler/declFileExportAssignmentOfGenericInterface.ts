//@module: amd
// @declaration: true

// @Filename: declFileExportAssignmentOfGenericInterface_0.ts
interface Foo<T> {
    a: string;
}
export = Foo;

// @Filename: declFileExportAssignmentOfGenericInterface_1.ts
import a = require('declFileExportAssignmentOfGenericInterface_0');
export var x: a<a<string>>;
x.a;