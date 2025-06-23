/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////export function /*1*/myFunction(testParam: string): Promise<void> { return Promise.resolve(); }

// @Filename: b.ts  
////export * from "./a";

// @Filename: c.ts
////import { myFunction as /*2*/myFunction } from "./b";
/////*3*/myFunction('test');

verify.baselineFindAllReferences('1', '2', '3')