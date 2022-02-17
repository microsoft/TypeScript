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

function verifyHasBar() {
    verify.completions({
        unsorted: [
            { name: "bar", text: "(method) IFoo.bar(): void", kind: "method" },
            ...completion.classElementKeywords,
        ],
        isNewIdentifierLocation: true,
    });
}

goTo.marker("1");
verifyHasBar();
edit.insert("b");
verifyHasBar();
goTo.marker("2");
verifyHasBar();
goTo.marker("3");
verifyHasBar();