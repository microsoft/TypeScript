/// <reference path="fourslash.ts" />
////declare function getPromise(): Promise<string>;
////const p = getPromise();
////while (true) {
////  p/*0*/.toLowerCase();
////  getPromise()/*1*/.toLowerCase();
////}

verify.not.codeFixAvailable("addMissingAwait");
verify.not.codeFixAvailable("addMissingAwaitToInitializer");
