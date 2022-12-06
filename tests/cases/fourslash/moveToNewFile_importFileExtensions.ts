/// <reference path="fourslash.ts"/>

// @Filename: /tsconfig.json
////{
////  "compilerOptions": {
////    "moduleResolution": "Node16",
////  }
////}

// @Filename: /package.json
//// { "type": "module" }

// @Filename: /src/main.ts
////[|export function someLibFn(): string {
////     return main();
////}|]
////
////function main(): string {
////    return "hello world!";
////}
////console.log(someLibFn());

// @Filename: /other.ts
////import { someLibFn } from "./src/main.js";
////
////function someOtherFn(): string {
////    return someLibFn();
////}

// @Filename: /act/action.ts
////import { someLibFn } from "../src/main.js";
////
////function doAction(): string {
////    return someLibFn();
////}


verify.moveToNewFile({
    newFileContents: {
      "/src/main.ts": 
`import { someLibFn } from "./someLibFn.js";

export function main(): string {
    return "hello world!";
}
console.log(someLibFn());`,

      "/src/someLibFn.ts": 
`import { main } from "./main.js";

export function someLibFn(): string {
    return main();
}
`,

    "/other.ts": 
`import { someLibFn } from "./src/someLibFn.js";

function someOtherFn(): string {
    return someLibFn();
}`,

  "/act/action.ts": 
`import { someLibFn } from "../src/someLibFn.js";

function doAction(): string {
    return someLibFn();
}`,
    }
});