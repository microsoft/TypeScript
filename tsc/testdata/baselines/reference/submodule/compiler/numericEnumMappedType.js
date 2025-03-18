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


//// [numericEnumMappedType.js]
var E1;
(function (E1) {
    E1[E1["ONE"] = 0] = "ONE";
    E1[E1["TWO"] = 1] = "TWO";
    E1[E1["THREE"] = 2] = "THREE";
})(E1 || (E1 = {}));
const b1 = {};
const b2 = {};
const e1 = E1.ONE;
const e2 = E2.ONE;
b1[1] = "a";
b1[e1] = "b";
b2[1] = "a";
b2[e2] = "b";
var N1;
(function (N1) {
    N1["A"] = val();
    if (typeof N1.A !== "string") N1[N1.A] = "A";
    N1["B"] = val();
    if (typeof N1.B !== "string") N1[N1.B] = "B";
})(N1 || (N1 = {}));
var N2;
(function (N2) {
    N2["C"] = val();
    if (typeof N2.C !== "string") N2[N2.C] = "C";
    N2["D"] = val();
    if (typeof N2.D !== "string") N2[N2.D] = "D";
})(N2 || (N2 = {}));
const e = E.ONE;
const x = e;
