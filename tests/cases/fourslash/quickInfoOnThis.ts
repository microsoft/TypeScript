/// <reference path='fourslash.ts' />

////function someFn1(someFn: { (): void; }) { }
////class Foo {
////    public bar() {
////        someFn1(
////            function doSomething() {
////                console.log(th/**/is);
////            }
////        )
////    }
////}

goTo.marker();
verify.quickInfoIs('any');
