///<reference path="fourslash.ts" />

////interface IFoo {
////    bar(): void;
////}
////class Foo1 implements IFoo {
////    zap() { }
////    /*1*/
////}
////class Foo2 implements IFoo {
////    zap() { }
////    b/*2*/() { }
////}
////class Foo3 implements IFoo {
////    zap() { }
////    b/*3*/: any;
////}
const allowedKeywordCount = verify.allowedClassElementKeywords.length;
function verifyHasBar() {
    verify.completionListContains("bar", "(method) IFoo.bar(): void", /*documentation*/ undefined, "method");
    verify.completionListContainsClassElementKeywords();
    verify.completionListCount(allowedKeywordCount + 1);
}

goTo.marker("1");
verifyHasBar();
edit.insert("b");
verifyHasBar();
goTo.marker("2");
verifyHasBar();
goTo.marker("3");
verifyHasBar();