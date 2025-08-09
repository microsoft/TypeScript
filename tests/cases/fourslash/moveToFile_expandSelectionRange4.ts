/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { b } from './other';
////const t = b;

// @Filename: /a.ts
//// interface T {
////     a: number
//// }
//// const x: T={
////     a: 1
//// };
//// [|const b = x|].a;

// @Filename: /other.ts
////export const b = 2;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`interface T {
    a: number
}
export const x: T={
    a: 1
};
`,

        "/bar.ts":
`import { x } from './a';
import { b } from './other';
const t = b;
const b = x.a;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});