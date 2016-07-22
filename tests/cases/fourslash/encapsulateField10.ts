/// <reference path='fourslash.ts' />

// @Target: ES3
// @Filename: file1.ts
////    export module m1 {
////    export class C1 {
////        public /*0*/x/*1*/: string;
////    }
//// }
// @Filename: file2.ts
//// import { m1 } from './file1'
//// export namespace ts {
////    export function f1() {
////        let c1: m1.C1 = new m1.C1();
////        c1.x = "dummy";
////        let dummyString = c1.x + "dummy2" + c1.x ;
////    }
//// }


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [
        {
            fileName: "file1.ts",
            expectedText: `
export module m1 {
    export class C1 {
        private _x: string;

        function setx(newx: string) {
            this._x = newx;
        }

        function getx(): string {
            return this._x;
        }
    }
}
`
        },
        {
            fileName: "file2.ts",
            expectedText: `
import { m1 } from './file1'
export namespace ts {
    export function f1() {
        let c1: m1.C1 = new m1.C1();
        c1.setx("dummy");
        let dummyString = c1.getx() + "dummy2" + c1.getx() ;
    }
}
`
        }
    ]
});