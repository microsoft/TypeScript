// @strict: true
// @noEmit: true

// When an intersection 'C & not A' has non-negated part 'C' that is mutually exclusive with the
// negated base 'A' by virtue of a shared discriminant property (a property present on both whose
// literal types are disjoint), the 'not A' member is redundant and is dropped, leaving 'C'.

interface A {
    kind: "a";
    field: string;
}
interface B {
    kind: "b";
    field: number;
}
interface C {
    kind: "c";
    field: object;
}

declare function wantsC(x: C): void;

// 'C & not A' -> 'C' because C.kind ("c") is disjoint from A.kind ("a").
declare const c1: C & not A;
c1; // C
wantsC(c1);

// Multiple negations, each mutually exclusive with C: 'C & not A & not B' -> 'C'.
declare const c2: C & not A & not B;
c2; // C
wantsC(c2);

// Non-discriminant negation is retained: 'C & not { other: number }' shares no disjoint discriminant.
declare const c3: C & not { other: number };
c3; // C & not { other: number; }

// A negation whose shared property has the SAME discriminant value is retained (not disjoint):
// C.kind and the negated base's kind are both "c", so they are not mutually exclusive.
declare const c4: C & not { kind: "c"; other: number };
c4; // C & not { kind: "c"; other: number; }

// Enum discriminants: two distinct string-enum members are mutually exclusive.
enum E {
    A = "a",
    B = "b",
}
interface EA {
    tag: E.A;
    payload: string;
}
interface EB {
    tag: E.B;
    payload: number;
}
declare function wantsEA(x: EA): void;

// 'EA & not EB' -> 'EA' because E.A and E.B are disjoint enum members.
declare const e1: EA & not EB;
e1; // EA
wantsEA(e1);

// A string-enum member is a *distinct* type from the bare string literal of its value: 'E.A' and
// '"a"' have an empty intersection ('E.A & "a"' is never), so they are mutually exclusive and the
// negation is dropped. This is precisely the case a by-identity comparison of the property types
// would get wrong -- the regular literal type of 'E.A' is the same '"a"', so identity would treat
// them as overlapping and wrongly keep the negation. The intersection-based check gets it right.
declare const e2: EA & not { tag: "a"; payload: number };
e2; // EA
wantsEA(e2);

// The same enum member on both sides is NOT disjoint, so the negation is retained.
declare const e3: EA & not { tag: E.A; extra: number };
e3; // EA & not { tag: E.A; extra: number; }

// A union-of-literals discriminant: '"a" | "b"' is disjoint from '"c" | "d"', so the negation is
// dropped even though neither side is a single unit type (a by-identity check would miss this).
interface P {
    kind: "a" | "b";
    p: string;
}
declare const u1: P & not { kind: "c" | "d"; p: number };
u1; // P


