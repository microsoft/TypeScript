// @strict: true
// @noEmit: true

type Step<T> = T extends string ? string : number;

interface Left<T> {
    next: Left<Step<T>>;
}
interface Right<T> {
    next: Right<Step<T>>;
}
declare const left: Left<string>;
const right: Right<string> = left;
const back: Left<string> = right;

interface LeftValue<T> {
    next: LeftValue<Step<T>>;
    value: T;
}
interface RightValue<T> {
    next: RightValue<Step<T>>;
    value: T;
}
interface NumericValue<T> {
    next: NumericValue<Step<T>>;
    value: number;
}
declare const text: LeftValue<string>;
const same: RightValue<string> = text;
const wrong: NumericValue<string> = text;
const wrongAgain: NumericValue<string> = text;

declare const numeric: LeftValue<number>;
const specialized: NumericValue<number> = numeric;
const specializedBack: LeftValue<number> = specialized;

type Value<T> = T extends { value: infer V } ? V : never;
type DeferredLeft<T> = LeftValue<Value<T>>;
declare function deferred<T>(): DeferredLeft<T>;
const incompatibleStep: RightValue<unknown> = deferred<{ value: string }>();
const incompatible: NumericValue<unknown> = deferred<{ value: string }>();

interface Producer<T> {
    next: Producer<T>;
    value: T;
}
interface OtherProducer<T> {
    next: OtherProducer<T>;
    value: T;
}
type DeferredProducer<T> = Producer<Value<T>>;
declare function producer<T>(): DeferredProducer<T>;
const covariant: OtherProducer<unknown> = producer<{ value: string }>();
const covariantBack: Producer<unknown> = covariant;
