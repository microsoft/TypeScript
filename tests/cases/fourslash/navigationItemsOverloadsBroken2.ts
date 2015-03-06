/// <reference path="fourslash.ts"/>

////function overload1(a: string): boolean;
////function overload1(b: boolean): boolean;
////function overload1(x: any, b = (function overload() { return false })): boolean {
////    throw overload1;
////}
////function overload1(b: number): boolean;
////function overload1(f: typeof overload): boolean;

////function overload2(a: string): boolean;
////function overload2(b: boolean): boolean;
////function overload2(x: any, b = (function overload() { return false })): boolean {
////    function overload2(): boolean;
////    function overload2(x: any): boolean;
////    throw overload2;
////}
////function overload2(b: number): boolean;
////function overload2(f: typeof overload): boolean;

verify.navigationItemsListCount(1, "overload1", "exact");
verify.navigationItemsListCount(3, "overload2", "exact");
verify.navigationItemsListCount(4, "overload", "prefix");