// @strict: true
// @noEmit: true

// Negated types used to build index signature key types.

// The canonical example: a string index that excludes a specific key.
type NoMethod = {
    [idx: string & not "method"]: number;
};

declare let noMethod: NoMethod;
noMethod.foo = 1;      // ok
noMethod.method = 1;   // excluded key
noMethod["bar"] = 2;   // ok

// Excluding a union of keys.
type NoAB = {
    [idx: string & not ("a" | "b")]: number;
};

declare let noAB: NoAB;
noAB.c = 1;   // ok
noAB.a = 1;   // excluded key
noAB.b = 1;   // excluded key

// Mapped-type form that produces the same key type.
type Config = {
    foo: number;
    bar: number;
} & {
    [k in (string & not ("foo" | "bar"))]: string;
};

const conf: Config = {
    foo: 12,
    bar: 12,
    other: "string",
}; // ok

const conf2: Config = {
    foo: 12,
    bar: 12,
    other: 0,
}; // other should be a string

// A bare negated type as an index key (not intersected with string).
type BareNegated = {
    [idx: not "method"]: number;
};
