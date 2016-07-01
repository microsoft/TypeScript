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

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
