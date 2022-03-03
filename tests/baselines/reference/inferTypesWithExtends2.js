//// [inferTypesWithExtends2.ts]
// infer twice with different constraints (same behavior as class/interface)
type X10<T> =
    T extends { a: infer U extends string, b: infer U extends number } ? U :
    never;


//// [inferTypesWithExtends2.js]
"use strict";
