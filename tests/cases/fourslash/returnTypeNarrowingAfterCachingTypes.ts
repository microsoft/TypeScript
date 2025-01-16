/// <reference path="fourslash.ts" />

// @strict: true
//// function h<T extends boolean>(x: T): T extends true ? 1 : T extends false ? 2 : never {
////   if (x) {
////       return 1;
////   }
////   return 2;
//// }

verify.encodedSemanticClassificationsLength("2020", 21);
verify.noErrors();