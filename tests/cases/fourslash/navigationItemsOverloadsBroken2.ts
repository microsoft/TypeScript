/// <reference path="fourslash.ts"/>

////function overload1(a: string): boolean;
////function overload1(b: boolean): boolean;
////[|function overload1(x: any, b = (function overload() { return false })): boolean {
////    throw overload1;
////}|]
////function overload1(b: number): boolean;
////function overload1(f: typeof overload): boolean;

////function overload2(a: string): boolean;
////function overload2(b: boolean): boolean;
////[|function overload2(x: any, b = (function overload() { return false })): boolean {
////    [|function overload2(): boolean;|]
////    function overload2(x: any): boolean;
////    throw overload2;
////}|]
////[|function overload2(b: number): boolean;|]
////function overload2(f: typeof overload): boolean;

const [r0, r1, r2, r3] = test.ranges();
const overload1: ReadonlyArray<FourSlashInterface.ExpectedNavigateToItem> = [
    { name: "overload1", kind: "function", range: r0 },
];
const overload2: ReadonlyArray<FourSlashInterface.ExpectedNavigateToItem> = [
    { name: "overload2", kind: "function", range: r1 },
    { name: "overload2", kind: "function", range: r2, containerName: "overload2", containerKind: "function" },
    { name: "overload2", kind: "function", range: r3 },
];
verify.navigateTo(
    { pattern: "overload1", expected: overload1 },
    {
        pattern: "overload2",
        expected: overload2,
    },
    {
        pattern: "overload",
        expected: [...overload1, ...overload2].map(item => ({ ...item, matchKind: "prefix" })),
    },
);
