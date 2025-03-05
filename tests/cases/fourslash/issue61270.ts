/// <reference path="fourslash.ts" />

// @target: es2024
// @module: commonjs

// @filename: test.ts
//// namespace NS { class Object {} }

verify.getSemanticDiagnostics([{
    code: 2725,
    message: "Class name cannot be 'Object' when targeting ES2024 with module CommonJS.",
    range: { pos: 21, end: 27, fileName: "test.ts" }
}]);
