/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "plugins": [
////             { "name": "quickinfo-augmeneter", "message": "hello world" }
////         ]
////     },
////     "files": ["a.ts"]
//// }

// @Filename: a.ts
//// let x = [1, 2];
//// x/**/
//// 

goTo.marker();
verify.quickInfoIs('Proxied x: number[]hello world');
