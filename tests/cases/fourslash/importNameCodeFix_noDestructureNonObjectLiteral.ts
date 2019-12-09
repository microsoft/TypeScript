/// <reference path="fourslash.ts" />

// @target: es2015
// @strict: true
// @esModuleInterop: true

// @Filename: /array.ts
////declare const arr: number[];
////export = arr;

// @Filename: /class-instance-member.ts
////class C { filter() {} }
////export = new C();

// @Filename: /class-static-member.ts
////class C { static filter() {} }
////export = C;

// @Filename: /object-literal.ts
////declare function filter(): void;
////export = { filter };

// @Filename: /index.ts
////filter/**/

verify.importFixModuleSpecifiers('', ['./object-literal']);