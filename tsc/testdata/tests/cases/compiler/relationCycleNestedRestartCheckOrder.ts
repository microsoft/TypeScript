// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Tests a relation cycle compared again from its least member, which finds a
// lesser member while it is compared.
//
// The optional parameter of 'Af' relates to the parameter of 'Ag' only if
// 'Cs' is not a strict subtype of 'Ct', and likewise for 'Bf' and 'Bg' with
// 'Ds' and 'Dt'. 'Cs' relates to 'Ct' only if 'Bf' relates to 'Bg', and 'Ds'
// relates to 'Dt' only if 'Cs' relates to 'Ct' and 'Af' relates to 'Ag'. No
// answer is consistent for these four comparisons, so each is answered as if
// the least of them, 'Af' to 'Ag', were compared first, wherever the cycle
// is entered. Subtype reduction drops 'Af' if it is a strict subtype of 'Ag'.
type Cs = { c0: Bf | Bg };
type Ct = { c0: Bg };
type Af = (w: { k: number }, x?: Cs) => 1;
type Ag = (w: { k: 1 }, x: Ct | undefined) => number;
type Bf = (w: { k: number }, x?: Ds) => 1;
type Bg = (w: { k: 1 }, x: Dt | undefined) => number;
type Ds = { c0: Cs | Ct; c1: Af | Ag };
type Dt = { c0: Ct; c1: Ag };

type WA = { a: Af; b: string };
type VA = { a: Ag };
type WD = { a: Ds; b: string };
type VD = { a: Dt };
declare let wa: WA, va: VA, wd: WD, vd: VD;
let oa = [wa, va];
let od = [wd, vd];
