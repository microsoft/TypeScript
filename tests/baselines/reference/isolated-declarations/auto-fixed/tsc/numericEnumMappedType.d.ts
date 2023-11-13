//// [tests/cases/compiler/numericEnumMappedType.ts] ////

//// [numericEnumMappedType.ts]
// Repro from #31771

enum E1 { ONE, TWO, THREE }
declare enum E2 { ONE, TWO, THREE }

type Bins1 = { [k in E1]?: string; }
type Bins2 = { [k in E2]?: string; }

const b1: Bins1 = {};
const b2: Bins2 = {};

const e1: E1 = E1.ONE;
const e2: E2 = E2.ONE;

b1[1] = "a";
b1[e1] = "b";

b2[1] = "a";
b2[e2] = "b";

// Multiple numeric enum types accrue to the same numeric index signature in a mapped type

declare function val(): number;

enum N1 { A = val(), B = val() }
enum N2 { C = val(), D = val() }

type T1 = { [K in N1 | N2]: K };

// Enum types with string valued members are always literal enum types and therefore
// ONE and TWO below are not computed members but rather just numerically valued members
// with auto-incremented values.

declare enum E { ONE, TWO, THREE = 'x' }
const e: E = E.ONE;
const x: E.ONE = e;


/// [Declarations] ////



//// [numericEnumMappedType.d.ts]
declare enum E1 {
    ONE = 0,
    TWO = 1,
    THREE = 2
}
declare enum E2 {
    ONE,
    TWO,
    THREE
}
type Bins1 = {
    [k in E1]?: string;
};
type Bins2 = {
    [k in E2]?: string;
};
declare const b1: Bins1;
declare const b2: Bins2;
declare const e1: E1;
declare const e2: E2;
declare function val(): number;
declare enum N1 {
    A,
    B
}
declare enum N2 {
    C,
    D
}
type T1 = {
    [K in N1 | N2]: K;
};
declare enum E {
    ONE,
    TWO,
    THREE = "x"
}
declare const e: E;
declare const x: E.ONE;
//# sourceMappingURL=numericEnumMappedType.d.ts.map