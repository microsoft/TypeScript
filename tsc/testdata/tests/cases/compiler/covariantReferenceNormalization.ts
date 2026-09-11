// @strict: true
// @noEmit: true

interface Producer<out T> {
    readonly value: T;
}
interface Consumer<in T> {
    consume: (value: T) => void;
}
interface Invariant<in out T> {
    value: T;
    consume: (value: T) => void;
}
interface Conditional<T> {
    value: unknown extends T ? "top" : "other";
}
interface OtherProducer<out T> {
    readonly value: T;
    readonly other: true;
}
interface SelfProducer<out T> {
    readonly value: T;
    readonly self: this;
}

declare function producer<T>(): Producer<T>;
declare function consumer<T>(): Consumer<T>;
declare function invariant<T>(): Invariant<T>;
declare function conditional<T>(): Conditional<T>;
declare function selfProducer<T>(): SelfProducer<T>;

const numberProducer: Producer<unknown> = producer<number>();
const neverProducer: Producer<unknown> = producer<never>();
const anyProducer: Producer<unknown> = producer<any>();
const anyTarget: Producer<any> = producer<number>();
const self: SelfProducer<unknown> = selfProducer<number>();

const wrongConsumer: Consumer<unknown> = consumer<number>();
const wrongInvariant: Invariant<unknown> = invariant<number>();
const wrongConditional: Conditional<unknown> = conditional<number>();
const wrongProducer: Producer<string> = producer<number>();
const wrongTarget: OtherProducer<unknown> = producer<number>();

type Value<T> = T extends { value: infer V } ? V : never;
type DeferredProducer<T> = Producer<Value<T>>;
type DeferredConsumer<T> = Consumer<Value<T>>;
type DeferredInvariant<T> = Invariant<Value<T>>;
type DeferredConditional<T> = Conditional<Value<T>>;
type DeferredOtherProducer<T> = OtherProducer<Value<T>>;
declare function deferredProducer<T>(): DeferredProducer<T>;
declare function deferredConsumer<T>(): DeferredConsumer<T>;
declare function deferredInvariant<T>(): DeferredInvariant<T>;
declare function deferredConditional<T>(): DeferredConditional<T>;
declare function deferredOtherProducer<T>(): DeferredOtherProducer<T>;

const deferredTop: Producer<unknown> = deferredProducer<{ value: number }>();
const deferredAny: Producer<any> = deferredProducer<{ value: number }>();
const deferredDerived: Producer<unknown> = deferredOtherProducer<{ value: number }>();
const wrongDeferredConsumer: Consumer<unknown> = deferredConsumer<{ value: number }>();
const wrongDeferredInvariant: Invariant<unknown> = deferredInvariant<{ value: number }>();
const wrongDeferredConditional: Conditional<unknown> = deferredConditional<{ value: number }>();
const wrongDeferredArgument: Producer<string> = deferredProducer<{ value: number }>();
const wrongDeferredMember: OtherProducer<unknown> = deferredProducer<{ value: number }>();

export {};
