// @strict: true
// @noEmit: true

enum A {
    One = 1,
    Two = "2",
}

const a: "2" = A.Two;
const b: 1 = A.One;

type Extant1 = A.One & 1;
type Extant2 = A.Two & "2";
type ExtantAny1 = A & 1;
type ExtantAny2 = A & "2";

const numericMember: Extant1 = A.One;
const stringMember: Extant2 = A.Two;
const numericEnum: ExtantAny1 = A.One;
const stringEnum: ExtantAny2 = A.Two;

const literalFirst: "2" & A.Two = A.Two;
const union: A & (0 | "2") = A.Two;
// @ts-expect-error
const mismatch: A & (0 | "2") = A.One;
// @ts-expect-error
const plainString: ExtantAny2 = "2";
