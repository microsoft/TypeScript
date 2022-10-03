/// <reference path="fourslash.ts"/>

////function overload(a: string): boolean;
////function overload(b: boolean): boolean;
////function overload(b: number): boolean;
////function overload(f: typeof overload): boolean;
////[|function overload(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}|]
////
////interface I {
////    [|interfaceMethodSignature(a: string): boolean;|]
////    interfaceMethodSignature(b: boolean): boolean;
////    interfaceMethodSignature(b: number): boolean;
////    interfaceMethodSignature(f: I): boolean;
////}
////
////class C {
////    methodOverload(a: string): boolean;
////    methodOverload(b: boolean): boolean;
////    methodOverload(b: number): boolean;
////    methodOverload(f: I): boolean;
////    [|methodOverload(x: any, b = (function overload() { return false })): boolean {
////        throw C;
////    }|]
////}

const [r0, r1, r2] = test.ranges();
const methodOverload: FourSlashInterface.ExpectedNavigateToItem =
    { name: "methodOverload", kind: "method", range: r2, containerName: "C", containerKind: "class" };
verify.navigateTo(
    {
        pattern: "overload",
        expected: [
            { name: "overload", kind: "function", range: r0 },
            { ...methodOverload, matchKind: "substring", isCaseSensitive: false },
        ]
    },
    {
        pattern: "interfaceMethodSignature",
        expected: [
            { name: "interfaceMethodSignature", kind: "method", range: r1, containerName: "I", containerKind: "interface" },
        ],
    },
    {
        pattern: "methodOverload",
        expected: [methodOverload],
    },
);
