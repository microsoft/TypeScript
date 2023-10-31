//// [tests/cases/conformance/expressions/binaryOperators/instanceofOperator/instanceofOperatorWithRHSHasSymbolHasInstance.ts] ////

//// [instanceofOperatorWithRHSHasSymbolHasInstance.ts]
interface Point { x: number, y: number }
interface Point3D { x: number, y: number, z: number }
interface Point3D2 extends Point { z: number }
interface Line { start: Point, end: Point }

declare var rhs0: { [Symbol.hasInstance](value: unknown): boolean; };
declare var rhs1: { [Symbol.hasInstance](value: any): boolean; };
declare var rhs2: { [Symbol.hasInstance](value: any): value is Point; };
declare var rhs3: { [Symbol.hasInstance](value: Point | Line): value is Point; };
declare var rhs4: { [Symbol.hasInstance](value: Point | Line): value is Line; };
declare var rhs5: { [Symbol.hasInstance](value: Point | Point3D | Line): value is Point3D; };
declare var rhs6: { [Symbol.hasInstance](value: Point3D | Line): value is Point3D; };

declare class Rhs7 { static [Symbol.hasInstance](value: unknown): boolean; }
declare class Rhs8 { static [Symbol.hasInstance](value: any): boolean; }
declare class Rhs9 { static [Symbol.hasInstance](value: any): value is Point; }
declare class Rhs10 { static [Symbol.hasInstance](value: Point | Line): value is Point; }
declare class Rhs11 { static [Symbol.hasInstance](value: Point | Line): value is Line; }
declare class Rhs12 { static [Symbol.hasInstance](value: Point | Point3D | Line): value is Point3D; }
declare class Rhs13 { static [Symbol.hasInstance](value: Point3D | Line): value is Point3D; }

declare var lhs0: any;
declare var lhs1: object;
declare var lhs2: Point | Point3D | Line;
declare var lhs3: Point3D | Line;
declare var lhs4: Point | Point3D2 | Line;

lhs0 instanceof rhs0 && lhs0;
lhs0 instanceof rhs1 && lhs0;
lhs0 instanceof rhs2 && lhs0;
lhs0 instanceof rhs3 && lhs0;
lhs0 instanceof rhs4 && lhs0;
lhs0 instanceof rhs5 && lhs0;
lhs0 instanceof rhs6 && lhs0;
lhs0 instanceof Rhs7 && lhs0;
lhs0 instanceof Rhs8 && lhs0;
lhs0 instanceof Rhs9 && lhs0;
lhs0 instanceof Rhs10 && lhs0;
lhs0 instanceof Rhs11 && lhs0;
lhs0 instanceof Rhs12 && lhs0;
lhs0 instanceof Rhs13 && lhs0;

lhs1 instanceof rhs0 && lhs1;
lhs1 instanceof rhs1 && lhs1;
lhs1 instanceof rhs2 && lhs1;
lhs1 instanceof Rhs7 && lhs1;
lhs1 instanceof Rhs8 && lhs1;
lhs1 instanceof Rhs9 && lhs1;

lhs2 instanceof rhs0 && lhs2;
lhs2 instanceof rhs1 && lhs2;
lhs2 instanceof rhs2 && lhs2;
lhs2 instanceof rhs3 && lhs2;
lhs2 instanceof rhs4 && lhs2;
lhs2 instanceof rhs5 && lhs2;
lhs2 instanceof Rhs7 && lhs2;
lhs2 instanceof Rhs8 && lhs2;
lhs2 instanceof Rhs9 && lhs2;
lhs2 instanceof Rhs10 && lhs2;
lhs2 instanceof Rhs11 && lhs2;
lhs2 instanceof Rhs12 && lhs2;

lhs3 instanceof rhs0 && lhs3;
lhs3 instanceof rhs1 && lhs3;
lhs3 instanceof rhs2 && lhs3;
lhs3 instanceof rhs3 && lhs3;
lhs3 instanceof rhs4 && lhs3;
lhs3 instanceof rhs5 && lhs3;
lhs3 instanceof rhs6 && lhs3;
lhs3 instanceof Rhs7 && lhs3;
lhs3 instanceof Rhs8 && lhs3;
lhs3 instanceof Rhs9 && lhs3;
lhs3 instanceof Rhs10 && lhs3;
lhs3 instanceof Rhs11 && lhs3;
lhs3 instanceof Rhs12 && lhs3;
lhs3 instanceof Rhs13 && lhs3;

lhs4 instanceof rhs0 && lhs4;
lhs4 instanceof rhs1 && lhs4;
lhs4 instanceof rhs2 && lhs4;
lhs4 instanceof rhs3 && lhs4;
lhs4 instanceof rhs4 && lhs4;
lhs4 instanceof rhs5 && lhs4;
lhs4 instanceof Rhs7 && lhs4;
lhs4 instanceof Rhs8 && lhs4;
lhs4 instanceof Rhs9 && lhs4;
lhs4 instanceof Rhs10 && lhs4;
lhs4 instanceof Rhs11 && lhs4;
lhs4 instanceof Rhs12 && lhs4;

declare class A {
    #x: number;

    // approximation of `getInstanceType` behavior, with one caveat: the checker versions unions the return types of
    // all construct signatures, but we have no way of extracting individual construct signatures from a type.
    static [Symbol.hasInstance]<T>(this: T, value: unknown): value is (
        T extends globalThis.Function ?
            T extends { readonly prototype: infer U } ?
                boolean extends (U extends never ? true : false) ? // <- tests whether 'U' is 'any'
                    T extends (abstract new (...args: any) => infer V) ? V : {} :
                U :
            never :
        never
    );
}

declare class B extends A { #y: number; }

declare const obj: unknown;
if (obj instanceof A) {
    obj; // A
}
if (obj instanceof B) {
    obj; // B
}

//// [instanceofOperatorWithRHSHasSymbolHasInstance.js]
lhs0 instanceof rhs0 && lhs0;
lhs0 instanceof rhs1 && lhs0;
lhs0 instanceof rhs2 && lhs0;
lhs0 instanceof rhs3 && lhs0;
lhs0 instanceof rhs4 && lhs0;
lhs0 instanceof rhs5 && lhs0;
lhs0 instanceof rhs6 && lhs0;
lhs0 instanceof Rhs7 && lhs0;
lhs0 instanceof Rhs8 && lhs0;
lhs0 instanceof Rhs9 && lhs0;
lhs0 instanceof Rhs10 && lhs0;
lhs0 instanceof Rhs11 && lhs0;
lhs0 instanceof Rhs12 && lhs0;
lhs0 instanceof Rhs13 && lhs0;
lhs1 instanceof rhs0 && lhs1;
lhs1 instanceof rhs1 && lhs1;
lhs1 instanceof rhs2 && lhs1;
lhs1 instanceof Rhs7 && lhs1;
lhs1 instanceof Rhs8 && lhs1;
lhs1 instanceof Rhs9 && lhs1;
lhs2 instanceof rhs0 && lhs2;
lhs2 instanceof rhs1 && lhs2;
lhs2 instanceof rhs2 && lhs2;
lhs2 instanceof rhs3 && lhs2;
lhs2 instanceof rhs4 && lhs2;
lhs2 instanceof rhs5 && lhs2;
lhs2 instanceof Rhs7 && lhs2;
lhs2 instanceof Rhs8 && lhs2;
lhs2 instanceof Rhs9 && lhs2;
lhs2 instanceof Rhs10 && lhs2;
lhs2 instanceof Rhs11 && lhs2;
lhs2 instanceof Rhs12 && lhs2;
lhs3 instanceof rhs0 && lhs3;
lhs3 instanceof rhs1 && lhs3;
lhs3 instanceof rhs2 && lhs3;
lhs3 instanceof rhs3 && lhs3;
lhs3 instanceof rhs4 && lhs3;
lhs3 instanceof rhs5 && lhs3;
lhs3 instanceof rhs6 && lhs3;
lhs3 instanceof Rhs7 && lhs3;
lhs3 instanceof Rhs8 && lhs3;
lhs3 instanceof Rhs9 && lhs3;
lhs3 instanceof Rhs10 && lhs3;
lhs3 instanceof Rhs11 && lhs3;
lhs3 instanceof Rhs12 && lhs3;
lhs3 instanceof Rhs13 && lhs3;
lhs4 instanceof rhs0 && lhs4;
lhs4 instanceof rhs1 && lhs4;
lhs4 instanceof rhs2 && lhs4;
lhs4 instanceof rhs3 && lhs4;
lhs4 instanceof rhs4 && lhs4;
lhs4 instanceof rhs5 && lhs4;
lhs4 instanceof Rhs7 && lhs4;
lhs4 instanceof Rhs8 && lhs4;
lhs4 instanceof Rhs9 && lhs4;
lhs4 instanceof Rhs10 && lhs4;
lhs4 instanceof Rhs11 && lhs4;
lhs4 instanceof Rhs12 && lhs4;
if (obj instanceof A) {
    obj; // A
}
if (obj instanceof B) {
    obj; // B
}
