// @strict: true
// @target: esnext
// @noEmit: true

interface Schema<O> { output: O; }
type Shape = Record<string, Schema<unknown>>;

declare class ObjectSchema<S extends Shape> implements Schema<{ [K in keyof S]: S[K]["output"] }> {
    constructor(shape: S);
    output: { [K in keyof S]: S[K]["output"] };
}

const constructed = new ObjectSchema({
    name: { output: "" },
    get next() { return constructed; },
});
const name: string = constructed.output.next.next.name;
constructed.output.next.next.missing;

const invalidConstructed = new ObjectSchema({
    get next() { return invalidConstructed; },
    get wrong() { return 42; },
});

class Factory<B extends Schema<unknown>> {
    wrap<T extends B>(value: T): T { return value; }
}
const factory = new Factory<Schema<string>>();
const invalidMethod = factory.wrap({
    get next() { return invalidMethod; },
    get output() { return 42; },
});

declare function constrain<T, U extends T>(value: U, expected: T): U;
const invalidDependent = constrain({
    get next() { return invalidDependent; },
    get output() { return ""; },
}, { output: 0 });

declare function withSchema<S extends Shape, A, B>(schema: S, fn: (value: A) => B): (value: A) => B;
declare function identity<T>(value: T): T;
const generic = withSchema({
    get name() { return { output: "" }; },
}, identity);
const n: number = generic(1);
const s: string = generic("");
const b: boolean = generic<boolean>(true);

declare function inner<U, T extends U>(value: T): U;
declare function outer(value: { value: number }, mode: "strict"): void;
declare function outer(value: unknown, mode: "loose"): void;
outer(inner({
    get value() { return ""; },
}), "loose");

export {};
