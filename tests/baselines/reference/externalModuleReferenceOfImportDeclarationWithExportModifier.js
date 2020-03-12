//// [tests/cases/compiler/externalModuleReferenceOfImportDeclarationWithExportModifier.ts] ////

//// [externalModuleReferenceOfImportDeclarationWithExportModifier_0.ts]
export function foo() { };

//// [externalModuleReferenceOfImportDeclarationWithExportModifier_1.ts]
export import file1 = require('externalModuleReferenceOfImportDeclarationWithExportModifier_0');
file1.foo();


//// [externalModuleReferenceOfImportDeclarationWithExportModifier_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { }
    exports.foo = foo;
    ;
});
//// [externalModuleReferenceOfImportDeclarationWithExportModifier_1.js]
define(["require", "exports", "externalModuleReferenceOfImportDeclarationWithExportModifier_0"], function (require, exports, file1) {
    "use strict";
    exports.__esModule = true;
    exports.file1 = file1;
    exports.file1.foo();
});
