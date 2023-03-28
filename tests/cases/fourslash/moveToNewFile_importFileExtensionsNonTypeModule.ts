/// <reference path="fourslash.ts"/>

// @Filename: /tsconfig.json
////{
////  "compilerOptions": {
////    "moduleResolution": "Node16",
////  }
////}

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
////import { someLibFn } from "./src/main";
////
////function someOtherFn(): string {
////    return someLibFn();
////}

// @Filename: /act/action.ts
////import { someLibFn } from "../src/main";
////
////function doAction(): string {
////    return someLibFn();
////}


verify.moveToNewFile({
    newFileContents: {
      "/src/main.ts": 
`import { someLibFn } from "./someLibFn";

export function main(): string {
    return "hello world!";
}
console.log(someLibFn());`,

      "/src/someLibFn.ts": 
`import { main } from "./main";

export function someLibFn(): string {
    return main();
}
`,

    "/other.ts": 
`import { someLibFn } from "./src/someLibFn";

function someOtherFn(): string {
    return someLibFn();
}`,

  "/act/action.ts": 
`import { someLibFn } from "../src/someLibFn";

function doAction(): string {
    return someLibFn();
}`,
    }
});