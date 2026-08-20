// @strict: true
// @noEmit: true

// De Morgan behavior and union/intersection interaction for negated types.

type A = { a: number };
type B = { b: number };

// not (A | B) is distributed to not A & not B.
type NotAorB = not (A | B);

// not (A & B) stays as a single negation of the intersection.
type NotAandB = not (A & B);

// A union of negations (not simplified by De Morgan in this direction).
type NotAorNotB = not A | not B;

// An intersection of negations equals the negation of the union.
type NotAandNotB = not A & not B;

// Primitive forms.
type NotStringOrNumber = not (string | number); // not string & not number
type NotStringAndNever = not string | not never; // not never => unknown, so union widens

// Assignability relationships between the forms.
declare let notAorB: NotAorB;       // not A & not B
declare let notAandNotB: NotAandNotB; // not A & not B

notAorB = notAandNotB; // should be ok (same type)
notAandNotB = notAorB; // should be ok (same type)

declare let notAorNotB: NotAorNotB; // not A | not B
notAorB = notAorNotB; // relationship probe
notAorNotB = notAorB; // relationship probe

// Concrete values against the distributed intersection.
declare let ab: A & B;
declare let aOnly: A;
notAorB = ab;    // probe: A & B excluded by both negations?
notAorB = aOnly; // probe: A excluded by not A
