//// [tests/cases/compiler/inheritedOverloadedSpecializedSignatures.ts] ////

//// [inheritedOverloadedSpecializedSignatures.ts]
interface A {
  (key:string):void;
}

interface B extends A {
  (key:'foo'):string;
}

var b:B;
// Should not error
b('foo').charAt(0);

interface A {
    (x: 'A1'): string;
    (x: string): void;
}

interface B extends A {
    (x: 'B1'): number;
}

interface A {
    (x: 'A2'): boolean;
}

interface B  {
    (x: 'B2'): string[];
}

interface C1 extends B {
	(x: 'C1'): number[];
}

interface C2 extends B {
	(x: 'C2'): boolean[];
}

interface C extends C1, C2 {
	(x: 'C'): string;
}

var c: C;
// none of these lines should error
var x1: string[] = c('B2');
var x2: number = c('B1');
var x3: boolean = c('A2');
var x4: string = c('A1');
var x5: void = c('A0');
var x6: number[] = c('C1');
var x7: boolean[] = c('C2');
var x8: string = c('C');
var x9: void = c('generic');


//// [inheritedOverloadedSpecializedSignatures.js]
var b;
// Should not error
b('foo').charAt(0);
var c;
// none of these lines should error
var x1 = c('B2');
var x2 = c('B1');
var x3 = c('A2');
var x4 = c('A1');
var x5 = c('A0');
var x6 = c('C1');
var x7 = c('C2');
var x8 = c('C');
var x9 = c('generic');
