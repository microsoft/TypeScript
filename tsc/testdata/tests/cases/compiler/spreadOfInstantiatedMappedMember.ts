// Two instantiations of a generic function each return a spread of the
// same mapped type member. Spreading a union of those return types orders
// the resulting object types by their members.

type Member = { [F in "text"]: { filter: F } }["text"];

function wrap<T extends "text" | "other">() {
    return { ...({ filter: "text" } as Member) };
}

declare const token: ReturnType<typeof wrap> | ReturnType<typeof wrap<"text">>;
export const spread = { ...token };

// An object rest of a union of two instantiations of `boxed` takes the member
// `p` of each. Each is `p` of `Box<T>` instantiated a second time, with `T` as
// one of two literal types. `restD` takes the rest of the instantiation with
// "d" before `restCD` takes the rest of both, and `restAB` and `restCD` list
// their constituents in the same order.

interface Box<A> { p: A }

function boxed<T>(b: Box<T>) {
    return { ...b };
}

declare const ab: ReturnType<typeof boxed<"a">> | ReturnType<typeof boxed<"b">>;
export const { ...restAB } = ab;

declare const d: ReturnType<typeof boxed<"d">>;
export const { ...restD } = d;
declare const cd: ReturnType<typeof boxed<"c">> | ReturnType<typeof boxed<"d">>;
export const { ...restCD } = cd;
