/// <reference path="fourslash.ts" />
// @Filename: a.ts
//// /**
////  * @param options - whatever
////  * @param options.zone - equally bad
////  */
//// declare function bad(options: any): void
////
//// /**
////  * @param {number} obtuse
////  */
//// function worse(): void {
////     arguments
//// }

goTo.file('a.ts')
verify.getSuggestionDiagnostics([]);

