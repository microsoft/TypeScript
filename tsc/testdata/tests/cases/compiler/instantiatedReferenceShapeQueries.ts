// @strict: true
// @target: esnext
// @noEmit: true

// Shape queries (weak types, single signatures, empty object types, string
// index signature only types, function object types) on instantiated interface
// references, including ones whose base types change shape when instantiated.

type Tagged<T> = { kind: T } & { kind: "a" };

declare const other: { other: number };

interface Weak<T extends string> extends Tagged<T> {
    opt?: number;
}
const weak1: Weak<"b"> = other;
const weak2: Weak<"a"> = other;

interface AllOptional<T> {
    a?: T;
    b?: T[];
}
interface AllOptionalDerived<T> extends AllOptional<T> {
    c?: T;
}
const weak3: AllOptional<string> = other;
const weak4: AllOptionalDerived<string> = other;

interface Empty<T extends string> extends Tagged<T> {}
const empty1: Empty<"b"> = { extra: 1 };
const empty2: Empty<"a"> = { kind: "a", extra: 1 };

type Two<T> = { <U>(x: U, y: T): U } & { <U>(x: U, y: string): U };
interface Overloads<T> extends Two<T> {}

declare function pipe<A extends any[], B>(f: (...args: A) => B): (...args: A) => B;

declare const merged: Overloads<string>;
const piped1: number = pipe(merged);

declare const distinct: Overloads<number>;
const piped2: number = pipe(distinct);

interface Dict<T extends string> extends Tagged<T> {
    [key: string]: unknown;
}

declare const dict: Dict<"b">;
const dict1 = dict["anything"];
const dict2: { [key: string]: number } = dict;

interface Wrap<T extends { a?: string }> extends T {}

const wrap1: Wrap<{ a?: string; b: number }> = other;
declare const wrap2: Wrap<{ a?: string; (): void }>;
wrap2.bind;

interface CallableBox<T> {
    (): T;
}
interface PlainBox<T> {
    value: T;
}

declare const box: CallableBox<string> | PlainBox<string>;
if (typeof box === "function") {
    box;
}
else {
    box;
}
