// @strict: true
// @noEmit: true

// Unions with at least ten constituents that all share a literal-typed property get a key property map,
// which inference uses to discriminate them, the same way relation checks do.

type Tagged<T> =
    | { kind: "k0"; value: T }
    | { kind: "k1"; value: { nested: T } }
    | { kind: "k2"; value: T[] }
    | { kind: "k3"; value: number }
    | { kind: "k4"; value: number }
    | { kind: "k5"; value: number }
    | { kind: "k6"; value: number }
    | { kind: "k7"; value: number }
    | { kind: "k8"; value: number }
    | { kind: "k9"; value: number }
    | { kind: "k10"; value: number };

declare function fromTagged<T>(tagged: Tagged<T>): T;

const direct = fromTagged({ kind: "k0", value: "a" });
const nested = fromTagged({ kind: "k1", value: { nested: "a" } });
const array = fromTagged({ kind: "k2", value: ["a"] });
const unrelated = fromTagged({ kind: "k3", value: 1 });

declare const k1Source: { kind: "k1"; value: { nested: boolean } };
const fromDeclared = fromTagged(k1Source);

declare const unknownKind: { kind: "missing"; value: { nested: boolean } };
const fromUnknownKind = fromTagged(unknownKind); // error

declare const broadKind: { kind: string; value: { nested: boolean } };
const fromBroadKind = fromTagged(broadKind); // error

type Concrete = Tagged<string>;
declare const concrete: Concrete;

declare function fromK2<T>(tagged: { kind: "k2"; value: T }): T;
const fromUnionSource = fromK2(concrete); // error
