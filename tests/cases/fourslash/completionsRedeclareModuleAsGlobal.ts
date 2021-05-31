/// <reference path="fourslash.ts" />

// 32675 - if this fails there are two copies of assert in completions

// @esModuleInterop: true,
// @target: esnext

// @Filename: /myAssert.d.ts
////declare function assert(value:any, message?:string):void;
////export = assert;
////export as namespace assert;

// @Filename: /ambient.d.ts
////import assert from './myAssert';
////
////type Assert = typeof assert;
////
////declare global {
////  const assert: Assert;
////}

// @Filename: /index.ts
/////// <reference path="./ambient.d.ts" />
////asser/**/;

verify.completions({
  marker: "",
  includes: [
    {
      name: "assert",
      sortText: completion.SortText.GlobalsOrKeywords
    }
  ],
  preferences: { includeCompletionsForModuleExports: true, includeInsertTextCompletions: true }
});
