// @target: esnext
// @lib: esnext
// @strict: true, false
// @noEmit: true

type Value = number & not { then(): any };
type Text = string & not { then(): any };

type NestedPromise = Promise<Promise<Value>>;
type ThenablePromise = Promise<PromiseLike<Value>>;
type CallableThenPromise = Promise<{ then(): any }>;
type UnionPromise = Promise<Value | Promise<Text>>;
type UnknownPromise = Promise<unknown>;
type OpenObjectPromise = Promise<{ value: number }>;
type PrimitivePromise = Promise<number>;
type VoidPromise = Promise<void>;

type ValuePromise = Promise<Value>;
type NullishPromise = Promise<null | undefined>;
type NeverPromise = Promise<never>;
type AnyPromise = Promise<any>;
type NonCallableThenPromise = Promise<{ then: number }>;

declare const value: Value;
declare const text: Text;
declare const nestedThenable: PromiseLike<PromiseLike<Value>>;
declare const valuePromise: Promise<Value>;

const resolved: Promise<Value> = Promise.resolve(nestedThenable);
const constructed: Promise<Value> = new Promise<Value>(resolve => resolve(valuePromise));
const rejected: Promise<Value> = Promise.reject<Value>("reason");
const chained: Promise<Text> = valuePromise.then(() => Promise.resolve(text));
const nestedChained: Promise<Value> = valuePromise.then(() => nestedThenable);
const caught: Promise<Value | Text> = valuePromise.catch(() => Promise.resolve(text));
const nestedCaught: Promise<Value> = valuePromise.catch(() => nestedThenable);
const finalized: Promise<Value> = valuePromise.finally(() => Promise.resolve(text));
const all = Promise.all([nestedThenable, Promise.resolve(text)]);
const race: Promise<Value | Text> = Promise.race([nestedThenable, Promise.resolve(text)]);
const any: Promise<Value | Text> = Promise.any([nestedThenable, Promise.resolve(text)]);
const settled = Promise.allSettled([nestedThenable]);
const tried: Promise<Value> = Promise.try(() => nestedThenable);
const resolvers: PromiseWithResolvers<Value> = Promise.withResolvers<Value>();
resolvers.resolve(valuePromise);
const empty: Promise<Awaited<void>> = Promise.resolve();
const inferredAsync = async () => 1;
const asyncResult: Promise<Awaited<number>> = inferredAsync();
const inferredGenericAsync = async <T>(value: T) => value;
const genericAsyncResult: Promise<Value> = inferredGenericAsync(nestedThenable);
const keyed = Promise.allKeyed({
    then: (resolve: (value: Value) => void) => resolve(value),
});
const keyedValue: Awaited<typeof keyed> = value;

new Promise<Promise<Value>>(() => {});
Promise.reject<Promise<Value>>("reason");
Promise.withResolvers<Promise<Value>>();
type NestedResolvers = PromiseWithResolvers<Promise<Value>>;

function resolveGeneric<T>(value: T): Promise<Awaited<T>> {
    return Promise.resolve(value);
}

function chainGeneric<T>(value: T): Promise<Awaited<T>> {
    return valuePromise.then(() => value);
}

async function awaitGeneric<T>(value: T): Promise<Awaited<T>> {
    return value;
}

async function awaitPrimitive(): Promise<Awaited<number>> {
    const result: Awaited<number> = await 1;
    return result;
}

async function returnPrimitive(): Promise<Awaited<number>> {
    return 1;
}

async function returnVoid(): Promise<Awaited<void>> {}

async function returnConstrained<T extends not { then(): any }>(value: T): Promise<T> {
    return value;
}

async function invalidReturn(): Promise<Promise<Value>> {
    return valuePromise;
}

type AwaitedValue = Awaited<Promise<Value>>;
type AwaitedNestedThenable = Awaited<typeof nestedThenable>;
type AwaitedUnknown = Awaited<unknown>;
type AwaitedNonCallableThen = Awaited<{ then: number }>;
type AwaitedInvalidThenable = Awaited<{ then(): any }>;

interface RecursiveValue {
    settled: Promise<RecursiveValue & not { then(): any }>;
}
