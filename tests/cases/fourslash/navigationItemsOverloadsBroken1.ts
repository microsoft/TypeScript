/// <reference path="fourslash.ts"/>

////function overload1(a: string): boolean;
////function overload1(b: boolean): boolean;
////function overload1(b: number): boolean;
////
////var heyImNotInterruptingAnythingAmI = '?';
////
////function overload1(f: typeof overload): boolean;
////function overload1(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}

////function overload2(a: string): boolean;
////function overload2(b: boolean): boolean;
////function overload2(b: number): boolean;
////
////function iJustRuinEverything(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}
////
////function overload2(f: typeof overload): boolean;
////function overload2(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}

verify.navigationItemsListCount(2, "overload1", "exact");
verify.navigationItemsListCount(2, "overload2", "exact");
verify.navigationItemsListCount(4, "overload", "prefix");