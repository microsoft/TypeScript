// @strictThis: true
/// <reference path='fourslash.ts' />
////interface Restricted {
////    n: number;
////}
////function wrapper(wrapped: { (): void; }) { }
////class Foo {
////    n: number;
////    public implicitThis() {
////        wrapper(
////            function implicitVoid() {
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
////class Bar<T> {
////    public implicitThis() {
////        console.log(th/*7*/is);
////    }
////    public explicitThis(this: Bar<T>) {
////        console.log(thi/*8*/s);
////    }
////}
////
////function implicitVoid(x: number): void {
////    return th/*9*/is;
////}
////function explicitVoid(th/*10*/is: void, x: number): void {
////    return th/*11*/is;
////}
////function explicitInterface(th/*12*/is: Restricted): void {
////    console.log(thi/*13*/s);
////}
////function explicitLiteral(th/*14*/is: { n: number }): void {
////    console.log(th/*15*/is);
////}

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
goTo.marker('7');
verify.quickInfoIs('this: this');
goTo.marker('8');
verify.quickInfoIs('this: Bar<T>');
goTo.marker('9');
verify.quickInfoIs('void');
goTo.marker('10');
verify.quickInfoIs('(parameter) this: void');
goTo.marker('11');
verify.quickInfoIs('void');
goTo.marker('12');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('13');
verify.quickInfoIs('this: Restricted');
goTo.marker('14');

verify.quickInfoIs('(parameter) this: {\n    n: number;\n}');
goTo.marker('15');
verify.quickInfoIs('this: {\n    n: number;\n}');