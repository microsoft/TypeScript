// @module: commonjs
// @target: es6
// @noImplicitAny: true

export interface StrategicState {
    lastStrategyApplied?: string;
}

export function strategy<T extends StrategicState>(stratName: string, gen: (a: T) => IterableIterator<T | undefined, void>): (a: T) => IterableIterator<T | undefined, void> {
    return function*(state) {
        for (const next of gen(state)) {
            if (next) {
                next.lastStrategyApplied = stratName;
            }
            yield next;
        }
    }
}

export interface Strategy<T> {
    (a: T): IterableIterator<T | undefined, void>;
}

export interface State extends StrategicState {
    foo: number;
}

export const Nothing: Strategy<State> = strategy("Nothing", function* (state: State) {
    yield 1; // number isn't a `State`, so this should error.
    return state; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});

export const Nothing1: Strategy<State> = strategy("Nothing", function* (state: State) {
});

export const Nothing2: Strategy<State> = strategy("Nothing", function* (state: State) {
    return 1; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});

export const Nothing3: Strategy<State> = strategy("Nothing", function* (state: State) {
    yield state;
    return 1; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});