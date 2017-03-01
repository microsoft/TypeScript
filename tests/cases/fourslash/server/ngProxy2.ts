/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "plugins": [
////             { "name": "invalidmodulename" }
////         ]
////     },
////     "files": ["a.ts"]
//// }

// @Filename: a.ts
//// let x = [1, 2];
//// x/**/
//// 

// LS shouldn't crash/fail if a plugin fails to load
goTo.marker();
verify.quickInfoIs('let x: number[]');
