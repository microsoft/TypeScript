/// <reference path="fourslash.ts" />

// @target: es5
// @module: node16

// @filename: test.ts
//// namespace NS { class Object {} }

verify.getSemanticDiagnostics([{
    code: 2725,
    message: "Class name cannot be 'Object' when targeting ES5 with module Node16.",
    range: { pos: 21, end: 27, fileName: "test.ts" }
}]);
