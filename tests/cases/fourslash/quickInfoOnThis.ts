/// <reference path='fourslash.ts' />
////interface Restricted {
////    n: number;
////}
////function wrapper(wrapped: { (): void; }) { }
////class Foo {
////    n: number;
////    prop1: th/*0*/is;
////    public explicitThis(this: this) {
////        wrapper(
////            function explicitVoid(this: void) {
////                console.log(th/*1*/is);
////            }
////        )
////        console.log(th/*2*/is);
////    }
////    public explicitInterface(th/*3*/is: Restricted) {
////        console.log(th/*4*/is);
////    }
////    public explicitClass(th/*5*/is: Foo) {
////        console.log(th/*6*/is);
////    }
////}

goTo.marker('0');
verify.quickInfoIs('this: this');
goTo.marker('1');
verify.quickInfoIs('void');
goTo.marker('2');
verify.quickInfoIs('this: this');
goTo.marker('3');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('4');
verify.quickInfoIs('this: Restricted');
goTo.marker('5');
verify.quickInfoIs('(parameter) this: Foo');
goTo.marker('6');
verify.quickInfoIs('this: Foo');