/// <reference path='fourslash.ts' />

////class A {
////    [|foo|]: string;
////}
////class B {
////    syntax1(a: A): void {
////        let { [|foo|] } = a;
////    }
////    syntax2(a: A): void {
////        let { [|foo|]: foo } = a;
////    }
////    syntax11(a: A): void {
////        let { [|foo|] } = a;
////        [|foo|] = "newString";
////    }
////}

verify.rangesAreRenameLocations();
