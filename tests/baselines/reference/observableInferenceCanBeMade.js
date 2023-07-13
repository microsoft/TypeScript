//// [tests/cases/compiler/observableInferenceCanBeMade.ts] ////

//// [observableInferenceCanBeMade.ts]
// Repro from #33131

declare function of<T>(a: T): Observable<T>;
declare function from<O extends ObservableInput<any>>(input: O): Observable<ObservedValueOf<O>>;

type ObservedValueOf<O> = O extends ObservableInput<infer T> ? T : never;

interface Subscribable<T> {
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): void;
}
type ObservableInput<T> = Subscribable<T> | Subscribable<never>;


declare class Observable<T> implements Subscribable<T> {
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): void;
}

function asObservable(input: string | ObservableInput<string>): Observable<string> {
    return typeof input === 'string' ? of(input) : from(input)
}


//// [observableInferenceCanBeMade.js]
"use strict";
// Repro from #33131
function asObservable(input) {
    return typeof input === 'string' ? of(input) : from(input);
}
