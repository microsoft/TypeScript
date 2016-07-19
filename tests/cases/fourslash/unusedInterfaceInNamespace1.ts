/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////    interface interface1 {
////    }
////} |]

verify.codeFixAtPosition(`
namespace greeter {
}`);
