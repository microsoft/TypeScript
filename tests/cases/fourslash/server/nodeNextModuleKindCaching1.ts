/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
////{
////    "compilerOptions": {
////      "rootDir": "src",
////      "outDir": "dist",
////      "target": "ES2020",
////      "module": "NodeNext",
////      "strict": true
////    },
////    "include": ["src\\**\\*.ts"]
////}

// @Filename: package.json
////{
////    "type": "module",
////    "private": true
////}

// @Filename: src/index.ts
////// The line below should show a "Relative import paths need explicit file
////// extensions..." error in VS Code, but it doesn't. The error is only picked up
////// by `tsc` which seems to properly infer the module type.
////import { helloWorld } from './example'
/////**/
////helloWorld()

// @Filename: src/example.ts
////export function helloWorld() {
////    console.log('Hello, world!')
////}

goTo.marker();
verify.numberOfErrorsInCurrentFile(1);
