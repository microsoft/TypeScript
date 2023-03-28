/// <reference path="fourslash.ts"/>

// @Filename: /src/main.ts
////import { message } from "./message.js";
////
////[|export function someLibFn(): string {
////     return main();
////}|]
////
////function main(): string {
////    return message;
////}
////console.log(someLibFn());

// @Filename: /message.ts
////export const message = "hello world";

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
`import { message } from "./message.js";
import { someLibFn } from "./someLibFn.js";

export function main(): string {
    return message;
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