/// <reference path='fourslash.ts' />

// @Target: ES3
// @Filename: file1.ts
////    export class C1 {
////        public /*0*/x/*1*/: string;
////    }
// @Filename: file2.ts
//// import { C1 } from './file1'
//// export namespace ts {
////    export function f1() {
////        let c1: C1 = new C1();
////        c1.x = "dummy";
////    }
//// }


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [
        {
            fileName: "file1.ts",
            expectedText: `
export class C1 {
    private _x: string;

    public setx(newx: string) {
        this._x = newx;
    }

    public getx(): string {
        return this._x;
    }
}
`
        },
        {
            fileName: "file2.ts",
            expectedText: `
import { C1 } from './file1'
export namespace ts {
    export function f1() {
        let c1: C1 = new C1();
        c1.setx("dummy");
    }
}
`
        }
    ]
});