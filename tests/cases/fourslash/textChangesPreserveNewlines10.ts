/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// [|class Foo {
//// 
////     constructor() {
////     }
//// 
////     public runCommand(): void {
////         let focusedEditor = 1;
////         // Only if editor text focus (i.e. not if editor has widget focus).
////         if (focusedEditor) {
////             return;
////         }
////     }
//// 
////     public run(): void { }
//// }|]
//// export const a = new Foo();

verify.moveToNewFile({
  newFileContents: {
    "/a.ts":
`import { Foo } from "./Foo";

export const a = new Foo();`,
    "/Foo.ts":
`export class Foo {

    constructor() {
    }

    public runCommand(): void {
        let focusedEditor = 1;
        // Only if editor text focus (i.e. not if editor has widget focus).
        if (focusedEditor) {
            return;
        }
    }

    public run(): void { }
}
`
  }
});
