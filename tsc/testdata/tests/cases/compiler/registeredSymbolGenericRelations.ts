// @target: es2015
// @strict: true
// @noEmit: true

type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends
    (<T>() => T extends B ? 1 : 2) ? true : false;

declare function inferKey<K extends string>(value: RegisteredSymbol<K>): K;
const inferred: "foo" = inferKey(Symbol.for("foo"));

function simplify<K extends string>() {
    const unionIsSymbol: true = null! as Equal<RegisteredSymbol<K> | symbol, symbol>;
    const intersectionIsRegistered: true = null! as Equal<RegisteredSymbol<K> & symbol, RegisteredSymbol<K>>;
    return { unionIsSymbol, intersectionIsRegistered };
}

function widenKey<K extends "foo" | "bar">(value: RegisteredSymbol<K>): RegisteredSymbol<"foo" | "bar"> {
    return value;
}

function widenGeneric<K extends L, L extends string>(value: RegisteredSymbol<K>): RegisteredSymbol<L> {
    return value;
}

function commonSymbol<K extends string>(value: RegisteredSymbol<K>): symbol {
    return value;
}

function intersect<K extends string>(value: RegisteredSymbol<K>): RegisteredSymbol<K> & symbol {
    return value;
}
