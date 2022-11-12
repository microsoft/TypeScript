/// <reference path="fourslash.ts"/>

// @Filename: /tsconfig.json
////{
////  "compilerOptions": {
////    "module": "Node16",
////  }
////}

// @Filename: /main.ts
////[|function someLibFn(): string {
////     return someOtherFn();
////}|]
////
////function someOtherFn(): string {
////    return "hello world!";
////}
////console.log(someLibFn());

verify.moveToNewFile({
    newFileContents: {
      "/main.ts": 
`import { someLibFn } from "./someLibFn.js";

export function someOtherFn(): string {
    return "hello world!";
}
console.log(someLibFn());`,

      "/someLibFn.ts": 
`import { someOtherFn } from "./main.js";

export function someLibFn(): string {
    return someOtherFn();
}
`,
    }
  });


// "compilerOptions": {
//     "composite": true,
//     "declaration": true,
//     "declarationMap": true,
//     "downlevelIteration": true,
//     "isolatedModules": true,
//     "module": "NodeNext",
//     "rootDir": "./",
//     "sourceMap": true,
//     "target": "esnext",
//     "newLine": "lf",
//     "useDefineForClassFields": true,
//     "strict": true,
//     "alwaysStrict": true,
//     "exactOptionalPropertyTypes": true,
//     "noImplicitOverride": true,
//     "noUncheckedIndexedAccess": true,
//     "importsNotUsedAsValues": "error",
//     "forceConsistentCasingInFileNames": true
// }
