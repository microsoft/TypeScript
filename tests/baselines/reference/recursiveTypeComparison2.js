//// [recursiveTypeComparison2.ts]
// Before fix this would cause compiler to hang (#1170)

declare module Bacon {
    interface Event<T> {
    }
    interface Error<T> extends Event<T> {
    }
    interface Observable<T> {
        zip<U, V>(other: EventStream<U>, f: (a: T, b: U) => V): EventStream<V>;
        slidingWindow(max: number, min?: number): Property<T[]>;
        log(): Observable<T>;
        combine<U, V>(other: Observable<U>, f: (a: T, b: U) => V): Property<V>;
        withStateMachine<U, V>(initState: U, f: (state: U, event: Event<T>) => StateValue<U, V>): EventStream<V>;
        decode(mapping: Object): Property<any>;
        awaiting<U>(other: Observable<U>): Property<boolean>;
        endOnError(f?: (value: T) => boolean): Observable<T>;
        withHandler(f: (event: Event<T>) => any): Observable<T>;
        name(name: string): Observable<T>;
        withDescription(...args: any[]): Observable<T>;
    }
    interface Property<T> extends Observable<T> {
    }
    interface EventStream<T> extends Observable<T> {
    }
    interface Bus<T> extends EventStream<T> {
    }
    var Bus: new <T>() => Bus<T>;
}

var stuck: Bacon.Bus<number> = new Bacon.Bus();

//// [recursiveTypeComparison2.js]
// Before fix this would cause compiler to hang (#1170)
var stuck = new Bacon.Bus();
