// @strict: true
// @strictFunctionTypes: false
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// 'S' relates to 'G' only if inferring 'T' from 'A' fails the constraint
// 'C', so that 'T' falls back to 'C'. Relating 'A' to 'C' compares 'S' to
// 'G' again, but 'A' fails 'C' on 'z' regardless. 'S' must relate to 'G'
// whether or not 'A' was compared to 'C' first.
namespace inferenceConstraint {
    type A = { k?: "c"; f: S | G; z: number };
    type C = { [s: string]: "c" | G | number; f: G; z: 1 };
    type S = <T extends C>(x: T) => T["k"];
    type G = (x: A) => "c" | G | number;

    declare let r1: S extends G ? true : false;
    declare let r2: A extends C ? true : false;
}

// As above, with method signatures, which are compared bivariantly.
namespace inferenceConstraintMethod {
    type A = { k?: "c"; f: S | G; z: number };
    type C = { [s: string]: "c" | G | number; f: G; z: 1 };
    type S = { m<T extends C>(x: T): T["k"] };
    type G = { m(x: A): "c" | G | number };

    declare let r1: S extends G ? true : false;
    declare let r2: A extends C ? true : false;
}

// 'S1' relates to 'G1' only if 'S2' does not relate to 'G2', and the
// reverse, so no answer is consistent for both. Each is answered as if
// compared first, assuming itself while relating the other, regardless
// of which assignment is checked first.
namespace inferenceConstraintMutual {
    type A1 = { k?: "c"; f: S2 | G2 };
    type C1 = { [s: string]: "c" | G2; f: G2 };
    type S1 = <T extends C1>(x: T) => T["k"];
    type G1 = (x: A1) => "c" | G2;
    type A2 = { k?: "d"; f: S1 | G1 };
    type C2 = { [s: string]: "d" | G1; f: G1 };
    type S2 = <T extends C2>(x: T) => T["k"];
    type G2 = (x: A2) => "d" | G1;

    declare let s1: S1;
    declare let s2: S2;
    let g1: G1 = s1;
    let g2: G2 = s2;
    declare let r1: S1 extends G1 ? true : false;
    declare let r2: S2 extends G2 ? true : false;
}

// 'Src' relates to the union 'Tgt' by discriminating on 'd'. The member
// '{ d: Y; y: number }' matches 'd: X' only if 'X' relates to 'Y', and
// relating 'X' to 'Y' compares 'Src' to 'Tgt' again before failing on
// 'q'. 'Src' must relate to 'Tgt' whether or not 'X' was compared to 'Y'
// first.
namespace discriminated {
    interface X { p: Src; q: number }
    interface Y { p: Tgt; q: 1 }
    type Src = { d: "a" | X; y: string };
    type Tgt = { d: "a"; y: string } | { d: X; y: string } | { d: Y; y: number };

    declare let r1: Src extends Tgt ? true : false;
    declare let r2: X extends Y ? true : false;
}

// The excess property check of the object literal keeps the members of
// 'Outer' whose 'e' the literal's 'e' relates to, so 'w' is known only
// if 'Src' relates to 'Tgt' as above.
namespace excessPropertyDiscriminant {
    interface X { p: Src; q: number }
    interface Y { p: Tgt; q: 1 }
    type Src = { d: "a" | X; y: string };
    type Tgt = { d: "a"; y: string } | { d: X; y: string } | { d: Y; y: number };
    type Outer = { e: "z" } | { e: Tgt; w: number } | { e: Src };

    declare let src: Src;
    let o: Outer = { e: src, w: 1 };
    declare let r2: X extends Y ? true : false;
}

// Subtype reduction drops 'F' if it is a strict subtype of 'G'. Its
// optional parameter relates only if 'P' is not a strict subtype of 'Q',
// and relating 'P' to 'Q' compares 'F' to 'G' again before failing on
// 'z'. 'F' must be dropped whether or not 'P' was compared to 'Q' first.
namespace strictArity {
    type P = { f: F | G; z: number };
    type Q = { f: G; z: 1 };
    type F = (x?: P) => 1;
    type G = (x: Q | undefined) => number;
    type WP = { a: P; b: string };
    type WQ = { a: Q };

    declare let f: F, g: G, wp: WP, wq: WQ;
    let a1 = [f, g];
    let a2 = [wp, wq];
}
