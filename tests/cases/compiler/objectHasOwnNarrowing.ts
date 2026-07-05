// @strict: true
// @target: es2022

// Basic narrowing — discriminated union member selection
type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };
declare const s: Shape;
if (Object.hasOwn(s, "radius")) {
    s; // narrowed to { kind: "circle"; radius: number }
    s.radius; // ok
}

// Unknown property on object — intersects with Record<key, unknown>
declare const x: object;
if (Object.hasOwn(x, "foo")) {
    x; // narrowed to object & Record<"foo", unknown>
}

// Union narrowing with partial types
type A = { tag: "a"; value: string };
type B = { tag: "b"; count: number };
type AB = A | B;
declare const ab: AB;
if (Object.hasOwn(ab, "value")) {
    ab; // narrowed to A
    ab.value; // string
}

// No narrowing in else branch (same-branch only, per maintainer guidance)
declare const maybe: { x?: number };
if (Object.hasOwn(maybe, "x")) {
    maybe; // narrowed to { x?: number } & Record<"x", unknown>
} else {
    maybe.x; // should still be number | undefined, NOT never
}

// Does not narrow when key is not a literal type
declare const dynamicKey: string;
declare const o2: { [k: string]: number };
if (Object.hasOwn(o2, dynamicKey)) {
    o2; // no narrowing, key is not a literal
}

// Works with aliased Object reference
const Obj = Object;
declare const o3: object;
if (Obj.hasOwn(o3, "hello")) {
    o3; // narrowed to object & Record<"hello", unknown>
}

// Negation with ! — no narrowing in the false branch
declare const o4: object;
if (!Object.hasOwn(o4, "a")) {
    o4; // not narrowed (we only narrow in true branch)
}

// True branch after negation doesn't narrow either (the else of the if(!...))
declare const o5: object;
if (!Object.hasOwn(o5, "b")) {
    // nothing
} else {
    // This is equivalent to Object.hasOwn(o5, "b") being true
    // The narrowType function inverts assumeTrue for PrefixUnary !, so the else
    // branch of if(!expr) sees assumeTrue=true — narrowing should work here
    o5; // narrowed to object & Record<"b", unknown>
}

// Narrowing with interface types having optional and required properties
interface Config {
    host: string;
    port?: number;
    ssl?: boolean;
}
declare const cfg: Config;
if (Object.hasOwn(cfg, "port")) {
    // port is optional, so the object type has it — narrowing filters by presence
    cfg; // type still Config (port is present in Config, so filter keeps it)
}

// Multiple hasOwn checks compound
declare const u: { a: string } | { b: number } | { a: string; b: number };
if (Object.hasOwn(u, "a")) {
    u; // { a: string } | { a: string; b: number }
    if (Object.hasOwn(u, "b")) {
        u; // { a: string; b: number }
    }
}
