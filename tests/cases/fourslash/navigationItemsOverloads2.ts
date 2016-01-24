/// <reference path="fourslash.ts"/>

////interface I {
////    interfaceMethodSignature(a: string): boolean;
////    interfaceMethodSignature(b: number): boolean;
////    interfaceMethodSignature(f: I): boolean;
////}
////interface I {
////    interfaceMethodSignature(b: boolean): boolean;
////}

verify.navigationItemsListCount(2, "interfaceMethodSignature", "exact");
