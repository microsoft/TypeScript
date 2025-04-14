// @strict: true
// @noEmit: true

// A union of function types is considered a type predicate if at least one constituent is a type
// predicate and the other constituents are matching type predicates or functions returning `false`.

type P1 = (x: unknown) => x is string;
type P2 = (x: unknown) => x is number;

type F1 = (x: unknown) => false;
type F2 = (x: unknown) => boolean;
type F3 = (x: unknown) => string;

function f1(x: unknown, p: P1 | P2) {
    if (p(x)) {
        x;  // string | number
    }
}

function f2(x: unknown, p: P1 | P2 | F1) {
    if (p(x)) {
        x;  // string | number
    }
}

function f3(x: unknown, p: P1 | P2 | F2) {
    if (p(x)) {
        x;  // unknown
    }
}

function f4(x: unknown, p: P1 | P2 | F3) {
    if (p(x)) {
        x;  // unknown
    }
}

// Repro from #54143

type HasAttribute<T> = T & { attribute: number };

class Type1 {
    attribute: number | null = null;
    predicate(): this is HasAttribute<Type1> {
        return true;
    }
}

class Type2 {
    attribute: number | null = null;
    predicate(): boolean {
        return true;
    }
}

function assertType<T>(_val: T) {
}

declare const val: Type1 | Type2;

if (val.predicate()) {
    assertType<number>(val.attribute);  // Error
}
