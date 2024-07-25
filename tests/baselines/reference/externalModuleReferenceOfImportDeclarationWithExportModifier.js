//// [tests/cases/compiler/externalModuleReferenceOfImportDeclarationWithExportModifier.ts] ////

//// [externalModuleReferenceOfImportDeclarationWithExportModifier_0.ts]
export function foo() { };

//// [externalModuleReferenceOfImportDeclarationWithExportModifier_1.ts]
export import file1 = require('externalModuleReferenceOfImportDeclarationWithExportModifier_0');
file1.foo();


//// [externalModuleReferenceOfImportDeclarationWithExportModifier_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    function foo() { }
    ;
});
//// [externalModuleReferenceOfImportDeclarationWithExportModifier_1.js]
define(["require", "exports", "externalModuleReferenceOfImportDeclarationWithExportModifier_0"], function (require, exports, file1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.file1 = file1;
    exports.file1.foo();
});
