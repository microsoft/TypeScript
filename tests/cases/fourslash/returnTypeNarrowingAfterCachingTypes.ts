/// <reference path="fourslash.ts" />

// @strict: true
//// function h<T extends boolean>(obj: { x: T }): T extends true ? 1 : T extends false ? 2 : 1 | 2 {
////   if (obj.x) {
////       return 1;
////   }
////   return 2;
//// }

verify.encodedSemanticClassificationsLength("2020", 27);
verify.noErrors();