/// <reference path='fourslash.ts' />

// @strict: true

// @Filename: test.ts
//// (function() {
////   const config = {
////     values: [],
////     value: {},
////   };
////
////   config.values.push(config.value);
//// }());

goTo.file('test.ts');

verify.getSemanticDiagnostics([{
    code: 2345,
    message: "Argument of type '{}' is not assignable to parameter of type 'never'.",
    range: { pos: 91, end: 103,fileName: "test.ts" }
}]);

verify.not.codeFixAvailable();
