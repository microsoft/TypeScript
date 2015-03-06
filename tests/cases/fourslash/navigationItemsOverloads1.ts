/// <reference path="fourslash.ts"/>

////function overload(a: string): boolean;
////function overload(b: boolean): boolean;
////function overload(b: number): boolean;
////function overload(f: typeof overload): boolean;
////function overload(x: any, b = (function overload() { return false })): boolean {
////    throw overload;
////}
////
////interface I {
////    interfaceMethodSignature(a: string): boolean;
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
////    methodOverload(x: any, b = (function overload() { return false })): boolean {
////        throw C;
////    }
////}

verify.navigationItemsListCount(1, "overload", "exact");
verify.navigationItemsListCount(1, "interfaceMethodSignature", "exact");
verify.navigationItemsListCount(1, "methodOverload", "exact");
