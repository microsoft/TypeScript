/// <reference path="../fourslash.ts"/>

// @Filename: file1.ts
//// /// <reference path='./file2.ts' />
////    export module m1 {
////    export class C1 {
////        public /*0*/x/*1*/: string;
////    }
//// }
// @Filename: file2.ts
//// /// <reference path='./file1.ts' />
//// import { m1 } from './file1'
//// export namespace ts {
////    export function f1() {
////        let c1: m1.C1 = new m1.C1();
////        c1.x = "dummy";
////        let dummyString = c1.x + "dummy2" + c1.x ;
////    }
//// }
// @Filename: tsconfig.json
////{ "compilerOptions": {"target": "ES3"}, "files": ["file1.ts", "file2.ts"] }


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [
        {
            fileName: "file1.ts",
            expectedText: `
/// <reference path='./file2.ts' />
export module m1 {
    export class C1 {
        private _x: string;

        public setx(newx: string) {
            this._x = newx;
        }

        public getx(): string {
            return this._x;
        }
    }
}
`
        },
        {
            fileName: "file2.ts",
            expectedText: `
/// <reference path='./file1.ts' />
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