/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "plugins": [
////             { "name": "create-thrower" }
////         ]
////     },
////     "files": ["a.ts"]
//// }

// @Filename: a.ts
//// let x = [1, 2];
//// x/**/
//// 

// LS shouldn't crash/fail if a plugin fails to init correctly
goTo.marker();
verify.quickInfoIs('let x: number[]');
