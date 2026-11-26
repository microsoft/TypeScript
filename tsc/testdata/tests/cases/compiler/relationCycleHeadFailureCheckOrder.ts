// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Tests the canonical answer of a non-monotone relation cycle whose first
// comparison fails.
//
// Subtype reduction drops 'Fz' if it is a strict subtype of 'Gz'. Its
// optional parameter relates only if 'Ap' is not a strict subtype of 'Aq',
// and relating 'Ap' to 'Aq' compares 'Fz' to 'Gz' again. Nothing else can
// fail, so no answer is consistent for both comparisons. Each is answered as
// if the least of them, 'Ap' to 'Aq', were compared first, wherever the cycle
// is entered. 'Gz' is not a subtype of 'Fz' because of the first parameter.
type Ap = { f: Fz | Gz };
type Aq = { f: Gz };
type Fz = (w: { k: number }, x?: Ap) => 1;
type Gz = (w: { k: 1 }, x: Aq | undefined) => number;
type WP = { a: Ap; b: string };
type WQ = { a: Aq };

declare let f: Fz, g: Gz, wp: WP, wq: WQ;
let a1 = [f, g];
let a2 = [wp, wq];
