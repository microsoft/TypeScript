// checking subtype relations for function types as it relates to contextual signature instantiation

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

declare function foo1(a: (x: number) => number[]): typeof a;
declare function foo1(a: any): any;

declare function foo2(a: (x: number) => string[]): typeof a;
declare function foo2(a: any): any;

declare function foo3(a: (x: number) => void): typeof a;
declare function foo3(a: any): any;

declare function foo4(a: (x: string, y: number) => string): typeof a;
declare function foo4(a: any): any;

declare function foo5(a: (x: (arg: string) => number) => string): typeof a;
declare function foo5(a: any): any;

declare function foo6(a: (x: (arg: Base) => Derived) => Base): typeof a;
declare function foo6(a: any): any;

declare function foo7(a: (x: (arg: Base) => Derived) => (r: Base) => Derived): typeof a;
declare function foo7(a: any): any;

declare function foo8(a: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a;
declare function foo8(a: any): any;

declare function foo9(a: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a;
declare function foo9(a: any): any;

declare function foo10(a: (...x: Derived[]) => Derived): typeof a;
declare function foo10(a: any): any;

declare function foo11(a: (x: { foo: string }, y: { foo: string; bar: string }) => Base): typeof a;
declare function foo11(a: any): any;

declare function foo12(a: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>): typeof a;
declare function foo12(a: any): any;

declare function foo13(a: (x: Array<Base>, y: Array<Derived>) => Array<Derived>): typeof a;
declare function foo13(a: any): any;

declare function foo14(a: (x: { a: string; b: number }) => Object): typeof a;
declare function foo14(a: any): any;

declare function foo15(a: { 
    (x: number): number[];
    (x: string): string[]; 
}): typeof a;
declare function foo15(a: any): any;

declare function foo16(a: {
    <T extends Derived>(x: T): number[];
    <U extends Base>(x: U): number[];
}): typeof a;
declare function foo16(a: any): any;

declare function foo17(a: {
    (x: (a: number) => number): number[];
    (x: (a: string) => string): string[];
}): typeof a;
declare function foo17(a: any): any;

declare function foo18(a: {
    (x: {
        (a: number): number;
        (a: string): string;
    }): any[];
    (x: {
        (a: boolean): boolean;
        (a: Date): Date;
    }): any[];
}): typeof a;
declare function foo18(a: any): any;

var r1arg1 = <T>(x: T) => [x];
var r1arg2 = (x: number) => [1];
var r1 = foo1(r1arg1); // any, return types are not subtype of first overload
var r1a = [r1arg2, r1arg1]; // generic signature, subtype in both directions
var r1b = [r1arg1, r1arg2]; // generic signature, subtype in both directions

var r2arg1 = <T>(x: T) => [''];
var r2arg2 = (x: number) => [''];
var r2 = foo2(r2arg1); 
var r2a = [r2arg1, r2arg2];
var r2b = [r2arg2, r2arg1];

var r3arg1 = <T>(x: T) => x;
var r3arg2 = (x: number) => { };
var r3 = foo3(r3arg1); 
var r3a = [r3arg1, r3arg2];
var r3b = [r3arg2, r3arg1];

var r4arg1 = <T, U>(x: T, y: U) => x;
var r4arg2 = (x: string, y: number) => '';
var r4 = foo4(r4arg1); // any
var r4a = [r4arg1, r4arg2];
var r4b = [r4arg2, r4arg1];

var r5arg1 = <T, U>(x: (arg: T) => U) => <T>null;
var r5arg2 = (x: (arg: string) => number) => '';
var r5 = foo5(r5arg1); // any
var r5a = [r5arg1, r5arg2];
var r5b = [r5arg2, r5arg1];

var r6arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U) => <T>null;
var r6arg2 = (x: (arg: Base) => Derived) => <Base>null;
var r6 = foo6(r6arg1); // any
var r6a = [r6arg1, r6arg2];
var r6b = [r6arg2, r6arg1];

var r7arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U) => (r: T) => <U>null;
var r7arg2 = (x: (arg: Base) => Derived) => (r: Base) => <Derived>null;
var r7 = foo7(r7arg1); // any
var r7a = [r7arg1, r7arg2];
var r7b = [r7arg2, r7arg1];

var r8arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: T) => U) => (r: T) => <U>null;
var r8arg2 = (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => <Derived>null;
var r8 = foo8(r8arg1); // any
var r8a = [r8arg1, r8arg2];
var r8b = [r8arg2, r8arg1];

var r9arg1 = <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: string; bing: number }) => U) => (r: T) => <U>null;
var r9arg2 = (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => <Derived>null;
var r9 = foo9(r9arg1); // any
var r9a = [r9arg1, r9arg2];
var r9b = [r9arg2, r9arg1];

var r10arg1 = <T extends Derived>(...x: T[]) => x[0];
var r10arg2 = (...x: Derived[]) => <Derived>null;
var r10 = foo10(r10arg1); // any
var r10a = [r10arg1, r10arg2];
var r10b = [r10arg2, r10arg1];

var r11arg1 = <T extends Base>(x: T, y: T) => x;
var r11arg2 = (x: { foo: string }, y: { foo: string; bar: string }) => <Base>null;
var r11 = foo11(r11arg1); // any
var r11a = [r11arg1, r11arg2];
var r11b = [r11arg2, r11arg1];

var r12arg1 = <T extends Array<Base>>(x: Array<Base>, y: T) => <Array<Derived>>null;
var r12arg2 = (x: Array<Base>, y: Array<Derived2>) => <Array<Derived>>null;
var r12 = foo12(r12arg1); // any
var r12a = [r12arg1, r12arg2];
var r12b = [r12arg2, r12arg1];

var r13arg1 = <T extends Array<Derived>>(x: Array<Base>, y: T) => y;
var r13arg2 = (x: Array<Base>, y: Array<Derived>) => <Array<Derived>>null;
var r13 = foo13(r13arg1); // any
var r13a = [r13arg1, r13arg2];
var r13b = [r13arg2, r13arg1];

var r14arg1 = <T>(x: { a: T; b: T }) => x.a;
var r14arg2 = (x: { a: string; b: number }) => <Object>null;
var r14 = foo14(r14arg1); // any
var r14a = [r14arg1, r14arg2];
var r14b = [r14arg2, r14arg1];

var r15arg1 = <T>(x: T) => <T[]>null
var r15 = foo15(r15arg1); // any
var r16arg1 = <T extends Base>(x: T) => [1];
var r16 = foo16(r16arg1); 
var r17arg1 = <T>(x: (a: T) => T) => <T[]>null;
var r17 = foo17(r17arg1); // any
var r18arg1 = <T>(x: (a: T) => T) => <T[]>null;
var r18 = foo18(r18arg1); 
