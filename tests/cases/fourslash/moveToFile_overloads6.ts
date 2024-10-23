/// <reference path='fourslash.ts' />

// @Filename: /b.ts
////

// @Filename: /test.ts
////import store from "./store";
////export function a() {
////console.log({store});
////}
////[|export function b() {
////console.log(store);
////}|]

verify.moveToFile({
    newFileContents: {
        "/b.ts":
`import store from "./store";


export function b() {
    console.log(store);
}
`,
        "/test.ts":
`import store from "./store";
export function a() {
console.log({store});
}
`
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" },
});
