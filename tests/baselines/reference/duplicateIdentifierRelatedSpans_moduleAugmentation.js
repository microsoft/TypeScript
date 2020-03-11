//// [tests/cases/compiler/duplicateIdentifierRelatedSpans_moduleAugmentation.ts] ////

//// [a.ts]
export const x = 0;

//// [b.ts]
export {};

declare module "./a" {
    export const x = 0;
}

declare module "../dir/a" {
    export const x = 0;
}


//// [a.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 0;
//// [b.js]
"use strict";
exports.__esModule = true;
