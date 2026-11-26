// @strict: true
// @noEmit: true

// A spread of a union of two object types in a generic function makes two
// object literal types that share the symbol of the spread expression. Each
// call of the function instantiates both of them with the same type
// arguments, so the return type of the call is a union of two instantiations
// with equal mappers.
//
// readParts also returns the constituent with `b: number`, narrowed from that
// union. Reading `all` first instantiates the two object literal types in
// union order; reading `withNumber` first instantiates the second of them
// before the first. The unions of `allX` and `allY` list their members in the
// same order.

declare const ctx: { a: string; b: undefined } | { a: string; b: number };

function read<K extends string>(fields: readonly K[]) {
    return { ...ctx, projection: fields };
}

export const r = read(["x"]);

function readParts<K extends string>(fields: readonly K[]) {
    const v = { ...ctx, projection: fields };
    return { all: v, withNumber: v.b !== undefined ? v : undefined };
}

const x = readParts(["x"]);
export const allX = x.all;
export const withNumberX = x.withNumber;

const y = readParts(["y"]);
export const withNumberY = y.withNumber;
export const allY = y.all;
