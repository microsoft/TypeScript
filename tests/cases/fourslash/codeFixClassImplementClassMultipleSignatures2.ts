/// <reference path='fourslash.ts' />

////class A {
////    method(a: any, b: string): boolean;
////    method(a: string, b: number): Function;
////    method(a: string): Function;
////    method(a: string | number, b?: string | number): boolean | Function { return true; }
////}
////class C implements A {[| |]}

verify.codeFix({
    description: "Implement interface 'A'",
    // TODO: GH#18445
    newFileContent:
`class A {
    method(a: any, b: string): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
    method(a: string | number, b?: string | number): boolean | Function { return true; }
}
class C implements A {\r
    method(a: any, b: string): boolean;\r
    method(a: string, b: number): Function;\r
    method(a: string): Function;\r
    method(a: string | number, b?: string | number): boolean | Function {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});
