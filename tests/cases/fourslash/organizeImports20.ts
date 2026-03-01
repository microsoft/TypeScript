/// <reference path="fourslash.ts" />

////const a = 1;
////const b = 1;
////export { a };
////export { b };

verify.organizeImports(
`const a = 1;
const b = 1;
export { a, b };
`);
