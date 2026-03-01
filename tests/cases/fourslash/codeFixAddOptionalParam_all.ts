/// <reference path='fourslash.ts' />

////[|function f1() {}|]
////
////const a = 1;
////const b = "";
////f1(a, b, true);
////
////function f2() {}
////f2("", { x: 1 }, [ "" ], true);
////
////class C {
////    [|m1() {}|]
////    m2(a: boolean) {
////        this.m1(a);
////    }
////}
////
////function f3(a: string): string;
////function f3(a: string, b?: number): string;
////function f3(a: string, b?: number): string {
////    return "";
////}
////f3("", "", 1);

verify.codeFixAll({
    fixId: "addOptionalParam",
    fixAllDescription: ts.Diagnostics.Add_all_optional_parameters.message,
    newFileContent:
`function f1(a?: number, b?: string, p0?: boolean) {}

const a = 1;
const b = "";
f1(a, b, true);

function f2(p0?: string, p1?: { x: number; }, p2?: string[], p3?: boolean) {}
f2("", { x: 1 }, [ "" ], true);

class C {
    m1(a?: boolean) {}
    m2(a: boolean) {
        this.m1(a);
    }
}

function f3(a: string): string;
function f3(a: string, p0?: string, b?: number): string;
function f3(a: string, p0?: string, b?: number): string {
    return "";
}
f3("", "", 1);`
});
