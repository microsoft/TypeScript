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

export {};
