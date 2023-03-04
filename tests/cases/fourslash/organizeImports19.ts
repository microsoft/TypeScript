/// <reference path="fourslash.ts" />

////const a = 1;
////export { a };
////
////const b = 1;
////export { b };
////
////const c = 1;
////export { c };

verify.organizeImports(
`const a = 1;
export { a };

const b = 1;
export { b };

const c = 1;
export { c };
`);
