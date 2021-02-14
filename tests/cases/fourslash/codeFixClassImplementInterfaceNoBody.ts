/// <reference path="fourslash.ts" />

//// interface I {
////    m(): void
//// }
//// class C/*c*/ implements I

verify.errorExistsBeforeMarker("c")
goTo.marker("c")
verify.codeFixAvailable([
    { "description": "Implement required members of interface 'I'" },
    { "description": "Implement all members of interface 'I'" }
])
