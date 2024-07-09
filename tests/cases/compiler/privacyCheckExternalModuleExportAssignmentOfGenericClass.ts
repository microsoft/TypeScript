// @module: commonjs
// @declaration: true
// @Filename: privacyCheckExternalModuleExportAssignmentOfGenericClass_0.ts
export = Foo;
class Foo<A> {
    constructor(public a: A) { }
}

// @Filename: privacyCheckExternalModuleExportAssignmentOfGenericClass_1.ts
import Foo = require("./privacyCheckExternalModuleExportAssignmentOfGenericClass_0");
export = Bar;
interface Bar {
    foo: Foo<number>;
}