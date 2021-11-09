declare var Record: RecordConstructor;
// TODO: should have literal syntax.
type record = unknown;
type tuple = unknown;
type box<T = unknown> = unknown;
interface RecordConstructor {
    (arg: unknown): record;
    fromEntries(iter: Iterable<unknown>): record;
    isRecord(item: unknown): item is record;
    readonly prototype: null;
}

declare var Tuple: TupleConstructor;
interface TupleConstructor {
    (...args: unknown[]): tuple;
    isTuple(item: unknown): item is tuple;
    from(items: Iterable<unknown>, mapFn?: (key: number, value: unknown) => unknown, thisArg?: any): tuple;
    of(...items: unknown[]): tuple;

    readonly prototype: Tuple<unknown>;
}
interface Tuple<T> {
    readonly constructor: TupleConstructor;
    get length(): number;
    valueOf(): this;
    readonly [Symbol.toStringTag]: "Tuple";
    readonly [n: number]: T;
    // All methods omitted;
}

declare var Box: BoxConstructor;
interface BoxConstructor {
    <T>(val: T): box<T>;
    containsBoxes(val: record | tuple | box): boolean;
    readonly prototype: Box<unknown>;
}
interface Box<T> {
    readonly constructor: BoxConstructor;
    valueOf(): this;
    readonly [Symbol.toStringTag]: "Box";
    unbox(): T;
}
