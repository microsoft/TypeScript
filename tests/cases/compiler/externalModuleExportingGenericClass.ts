// @module: commonjs

// @Filename: externalModuleExportingGenericClass_file0.ts
class C<T> {
    foo: T;
}
export = C;


// @Filename: externalModuleExportingGenericClass_file1.ts
import a = require('./externalModuleExportingGenericClass_file0');
var v: a; // this should report error
var v2: any = (new a()).foo;
var v3: number = (new a<number>()).foo;
