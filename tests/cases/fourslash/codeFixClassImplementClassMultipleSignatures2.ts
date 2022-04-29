/// <reference path='fourslash.ts' />

////class A {
////    method(a: any, b: string): boolean;
////    method(a: string, b: number): Function;
////    method(a: string): Function;
////    method(a: string | number, b?: string | number): boolean | Function { return a + b as any; }
////}
////class C implements A { }

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`class A {
    method(a: any, b: string): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
    method(a: string | number, b?: string | number): boolean | Function { return a + b as any; }
}
class C implements A {
    method(a: any, b: string): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
    method(a: string | number, b?: string | number): boolean | Function {
        throw new Error("Method not implemented.");
    }
}`,
});
