// @strict: true
// @noEmit: true

type Difference<T, U> = T & not U;
type Product = { kind: "a"; value: 0 } | { kind: "b"; value: 1 };
type DoubleExcluded = {
    [Kind in Product["kind"]]: Difference<Product, Difference<Product, { kind: Kind }>>;
};
const productA: DoubleExcluded["a"] = { kind: "a", value: 0 };
const productB: DoubleExcluded["b"] = { kind: "b", value: 1 };

const wrongKind: DoubleExcluded["a"] = { kind: "b", value: 1 };
const wrongValue: DoubleExcluded["b"] = { kind: "b", value: 0 };

type Selected<Kind extends Product["kind"]> = Difference<Product, Difference<Product, { kind: Kind }>>;
const selectedA: Selected<"a"> = productA;
const selectedB: Selected<"b"> = productB;
const selectedBoth: Selected<"a" | "b"> = productA;

type Tagged = { kind: "a" } | { kind: "b" };
interface Blocked { blocked: true; }
type Allowed = Difference<Tagged, Blocked>;
declare const excluded: { kind: "a" | "b"; blocked: true };
const rejected: Allowed = excluded;

declare const allowed: { kind: "a" | "b" } & not Blocked;
const accepted: Allowed = allowed;

declare const ordinary: { kind: "a" | "b" };
const plain: Tagged = ordinary;
const partiallyExcluded: (Tagged & not Blocked) | { kind: "a" } = excluded;
declare const alternative: { kind: "a"; blocked: true };
const acceptedAlternative: (Tagged & not Blocked) | { kind: "a" } = alternative;

function generic<Kind extends "a" | "b">(value: { kind: "a"; value: 0 }) {
    const rejected: Difference<Product, { kind: Kind }> = value;
}