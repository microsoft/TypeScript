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
////    prim1: number;
////    prim2: string;
////    ofT: T;
////    ofFooNum: Foo<number>;
////    ofInterface: I;
////    ofIG4: { x: number }; 
////    ofIG6: { x: T };
////    ofC2: C<number>;
////    ofC4: C<{ x: T }>
////}
////
////var f: Foo<any>;
////var f2: Foo<number>;
////var f3: Foo<I>;
////var f4: Foo<{ x: number }>;
////var f5: Foo<Foo<number>>;
////
////// T is any
////var f_/*a1*/r1  = f.prim1;
////var f_/*a2*/r2  = f.prim2;
////var f_/*a3*/r3  = f.ofT; 
////var f_/*a4*/r5  = f.ofFooNum;
////var f_/*a5*/r8  = f.ofInterface;
////var f_/*a6*/r12 = f.ofIG4;
////var f_/*a7*/r14 = f.ofIG6; 
////var f_/*a8*/r18 = f.ofC2;
////var f_/*a9*/r20 = f.ofC4; 
////
////// T is number
////var f2_/*b1*/r1  = f2.prim1;
////var f2_/*b2*/r2  = f2.prim2;
////var f2_/*b3*/r3  = f2.ofT; 
////var f2_/*b4*/r5  = f2.ofFooNum; 
////var f2_/*b5*/r8  = f2.ofInterface;
////var f2_/*b6*/r12 = f2.ofIG4;
////var f2_/*b7*/r14 = f2.ofIG6; 
////var f2_/*b8*/r18 = f2.ofC2;
////var f2_/*b9*/r20 = f2.ofC4; 
////
////// T is I
////var f3_/*c1*/r1  = f3.prim1;
////var f3_/*c2*/r2  = f3.prim2;
////var f3_/*c3*/r3  = f3.ofT; 
////var f3_/*c4*/r5  = f3.ofFooNum;
////var f3_/*c5*/r8  = f3.ofInterface;
////var f3_/*c6*/r12 = f3.ofIG4;
////var f3_/*c7*/r14 = f3.ofIG6; 
////var f3_/*c8*/r18 = f3.ofC2;
////var f3_/*c9*/r20 = f3.ofC4;
////
////// T is {x: number}
////var f4_/*d1*/r1 =  f4.prim1;
////var f4_/*d2*/r2 =  f4.prim2;
////var f4_/*d3*/r3 =  f4.ofT;
////var f4_/*d4*/r5 =  f4.ofFooNum;
////var f4_/*d5*/r8 =  f4.ofInterface;
////var f4_/*d6*/r12 = f4.ofIG4;
////var f4_/*d7*/r14 = f4.ofIG6;
////var f4_/*d8*/r18 = f4.ofC2;
////var f4_/*d9*/r20 = f4.ofC4; 
////
////// T is Foo<number>
////var f5_/*e1*/r1  = f5.prim1;
////var f5_/*e2*/r2  = f5.prim2;
////var f5_/*e3*/r3  = f5.ofT; 
////var f5_/*e4*/r5  = f5.ofFooNum;
////var f5_/*e5*/r8  = f5.ofInterface;
////var f5_/*e6*/r12 = f5.ofIG4;
////var f5_/*e7*/r14 = f5.ofIG6; 
////var f5_/*e8*/r18 = f5.ofC2;
////var f5_/*e9*/r20 = f5.ofC4;

verify.numberOfErrorsInCurrentFile(0);

goTo.marker('a1');
verify.quickInfoIs('number');
goTo.marker('a2');
verify.quickInfoIs('string');
goTo.marker('a3');
verify.quickInfoIs('any');
goTo.marker('a4');
verify.quickInfoIs('Foo<number>');
goTo.marker('a5');
verify.quickInfoIs('I');
goTo.marker('a6');
verify.quickInfoIs('{ x: number; }');
goTo.marker('a7');
verify.quickInfoIs('{ x: any; }');
goTo.marker('a8');
verify.quickInfoIs('C<number>');
goTo.marker('a9');
verify.quickInfoIs('C<{ x: any; }>');

goTo.marker('b1');
verify.quickInfoIs('number');
goTo.marker('b2');
verify.quickInfoIs('string');
goTo.marker('b3');
verify.quickInfoIs('number');
goTo.marker('b4');
verify.quickInfoIs('Foo<number>'); 
goTo.marker('b5');
verify.quickInfoIs('I');
goTo.marker('b6');
verify.quickInfoIs('{ x: number; }');
goTo.marker('b7');
verify.quickInfoIs('{ x: number; }');
goTo.marker('b8');
verify.quickInfoIs('C<number>');
goTo.marker('b9');
verify.quickInfoIs('C<{ x: number; }>');

goTo.marker('c1');
verify.quickInfoIs('number');
goTo.marker('c2');
verify.quickInfoIs('string');
goTo.marker('c3');
verify.quickInfoIs('I');
goTo.marker('c4');
verify.quickInfoIs('Foo<number>');
goTo.marker('c5');
verify.quickInfoIs('I');
goTo.marker('c6');
verify.quickInfoIs('{ x: number; }');
goTo.marker('c7');
verify.quickInfoIs('{ x: I; }');
goTo.marker('c8');
verify.quickInfoIs('C<number>');
goTo.marker('c9');
verify.quickInfoIs('C<{ x: I; }>');

goTo.marker('d1');
verify.quickInfoIs('number');
goTo.marker('d2');
verify.quickInfoIs('string');
goTo.marker('d3');
verify.quickInfoIs('{ x: number; }');
goTo.marker('d4');
verify.quickInfoIs('Foo<number>');
goTo.marker('d5');
verify.quickInfoIs('I');
goTo.marker('d6');
verify.quickInfoIs('{ x: number; }');
goTo.marker('d7');
verify.quickInfoIs('{ x: { x: number; }; }');
goTo.marker('d8');
verify.quickInfoIs('C<number>');
goTo.marker('d9');
verify.quickInfoIs('C<{ x: { x: number; }; }>');

goTo.marker('e1');
verify.quickInfoIs('number');
goTo.marker('e2');
verify.quickInfoIs('string');
goTo.marker('e3');
verify.quickInfoIs('Foo<number>');
goTo.marker('e4');
verify.quickInfoIs('Foo<number>');
goTo.marker('e5');
verify.quickInfoIs('I');
goTo.marker('e6');
verify.quickInfoIs('{ x: number; }');
goTo.marker('e7');
verify.quickInfoIs('{ x: Foo<number>; }');
goTo.marker('e8');
verify.quickInfoIs('C<number>');
goTo.marker('e9');
verify.quickInfoIs('C<{ x: Foo<number>; }>');


