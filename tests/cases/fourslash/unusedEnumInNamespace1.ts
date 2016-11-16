/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   enum enum1 {
////       Monday
////   }
//// } |]

verify.codeFixAtPosition(`namespace greeter {
}`);
