/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "moduleResolution": "Bundler",
////         "baseUrl": "."
////         "paths": {
////             "@foo/*": ["src/*"]
////         }
////     }
//// }

// @Filename: /src/a.ts
////export function a() {
////    b();
////}
////[|export function b() {
////}|]

verify.moveToNewFile({
    newFileContents: {
        "/src/a.ts":
`import { b } from "@foo/b";

export function a() {
    b();
}
`,
        "/src/b.ts":
`export function b() {
}
`,
    },
    preferences: {
        importModuleSpecifierPreference: "non-relative",
    }
});
