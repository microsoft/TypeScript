// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57343

type IsNumber<T> = T extends number ? true : false;

type Conflicted = { x: true } & { x: false };

type Ex1 = IsNumber<Conflicted>; // never
type Ex2 = IsNumber<"OEEE" | Conflicted>; // false
type Ex3 = IsNumber<1 | Conflicted>; // true
