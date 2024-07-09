/// <reference path="fourslash.ts"/>

////function overload1(a: string): boolean;
////function overload1(b: boolean): boolean;
////function overload1(b: number): boolean;
////
////var x= '?';
////
////function overload1(f: typeof overload): boolean;
////[|function overload1(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}|]

////function overload2(a: string): boolean;
////function overload2(b: boolean): boolean;
////function overload2(b: number): boolean;
////
////function y(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}
////
////function overload2(f: typeof overload): boolean;
////[|function overload2(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}|]

const [r0, r1] = test.ranges();
const overload1: FourSlashInterface.ExpectedNavigateToItem =
    { name: "overload1", kind: "function", range: r0 };
const overload2: FourSlashInterface.ExpectedNavigateToItem =
    { name: "overload2", kind: "function", range: r1 };
verify.navigateTo(
    {
        pattern: "overload1",
        expected: [overload1],
    },
    {
        pattern: "overload2",
        expected: [overload2],
    },
    {
        pattern: "overload",
        expected: [{ ...overload1, matchKind: "prefix" }, { ...overload2, matchKind: "prefix" }],
    }
);
