/// <reference path='fourslash.ts'/>

////interface I {
////    x: number;
////}
////
////var anInterface: I;
////interface IG<T> {
////    x: T;
////}
////var aGenericInterface: IG<number>;
////
////class C<T> implements IG<T> {
////    x: T;
////}
////
////interface Foo<T> {
////    ofFooT: Foo<T>;
////    ofFooFooNum: Foo<Foo<number>>; // should be error?
////    ofIG: IG<T>;
////    ofIG5: { x: Foo<T>; }; // same as ofIG3
////    ofC1: C<T>;
////}
////
////var f: Foo<any>;
////var f2: Foo<number>;
////var f3: Foo<I>;
////var f4: Foo<{ x: number }>;
////var f5: Foo<Foo<number>>;
////
////// T is any
////var f_/*a1*/r4 = f.ofFooT;
////var f_/*a2*/r7 = f.ofFooFooNum;
////var f_/*a3*/r9 = f.ofIG;
////var f_/*a5*/r13 = f.ofIG5; 
////var f_/*a7*/r17 = f.ofC1;
////
////// T is number
////var f2_/*b1*/r4 = f2.ofFooT;
////var f2_/*b2*/r7 = f2.ofFooFooNum;
////var f2_/*b3*/r9 = f2.ofIG;
////var f2_/*b5*/r13 = f2.ofIG5;
////var f2_/*b7*/r17 = f2.ofC1;
////
////// T is I}
////var f3_/*c1*/r4 = f3.ofFooT;
////var f3_/*c2*/r7 = f3.ofFooFooNum;
////var f3_/*c3*/r9 = f3.ofIG;
////var f3_/*c5*/r13 = f3.ofIG5;
////var f3_/*c7*/r17 = f3.ofC1;
////
////// T is {x: number}
////var f4_/*d1*/r4 = f4.ofFooT;
////var f4_/*d2*/r7 = f4.ofFooFooNum;
////var f4_/*d3*/r9 = f4.ofIG;
////var f4_/*d5*/r13 = f4.ofIG5;
////var f4_/*d7*/r17 = f4.ofC1;
////
////// T is Foo<number>
////var f5_/*e1*/r4 = f5.ofFooT;
////var f5_/*e2*/r7 = f5.ofFooFooNum;
////var f5_/*e3*/r9 = f5.ofIG;
////var f5_/*e5*/r13 = f5.ofIG5; 
////var f5_/*e7*/r17 = f5.ofC1;

verify.numberOfErrorsInCurrentFile(0);

goTo.marker('a1');
verify.quickInfoIs('Foo<any>');
goTo.marker('a2');
verify.quickInfoIs('Foo<Foo<number>>');
goTo.marker('a3');
verify.quickInfoIs('IG<any>');
goTo.marker('a5');
verify.quickInfoIs('{ x: Foo<any>; }');
goTo.marker('a7');
verify.quickInfoIs('C<any>');

goTo.marker('b1');
verify.quickInfoIs('Foo<number>');
goTo.marker('b2');
verify.quickInfoIs('Foo<Foo<number>>'); 
goTo.marker('b3');
verify.quickInfoIs('IG<number>');
goTo.marker('b5');
verify.quickInfoIs('{ x: Foo<number>; }');
goTo.marker('b7');
verify.quickInfoIs('C<number>');

goTo.marker('c1');
verify.quickInfoIs('Foo<I>');
goTo.marker('c2');
verify.quickInfoIs('Foo<Foo<number>>');
goTo.marker('c3');
verify.quickInfoIs('IG<I>');
goTo.marker('c5');
verify.quickInfoIs('{ x: Foo<I>; }');
goTo.marker('c7');
verify.quickInfoIs('C<I>');

goTo.marker('d1');
verify.quickInfoIs('Foo<{ x: number; }>');
goTo.marker('d2');
verify.quickInfoIs('Foo<Foo<number>>');
goTo.marker('d3');
verify.quickInfoIs('IG<{ x: number; }>');
goTo.marker('d5');
verify.quickInfoIs('{ x: Foo<{ x: number; }>; }');
goTo.marker('d7');
verify.quickInfoIs('C<{ x: number; }>');

goTo.marker('e1');
verify.quickInfoIs('Foo<Foo<number>>');
goTo.marker('e2');
verify.quickInfoIs('Foo<Foo<number>>');
goTo.marker('e3');
verify.quickInfoIs('IG<Foo<number>>');
goTo.marker('e5');
verify.quickInfoIs('{ x: Foo<Foo<number>>; }');
goTo.marker('e7');
verify.quickInfoIs('C<Foo<number>>');