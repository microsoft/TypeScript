//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck63.ts] ////

//// [generatorTypeCheck63.ts]
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

//// [generatorTypeCheck63.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nothing3 = exports.Nothing2 = exports.Nothing1 = exports.Nothing = void 0;
exports.strategy = strategy;
function strategy(stratName, gen) {
    return function* (state) {
        for (const next of gen(state)) {
            if (next) {
                next.lastStrategyApplied = stratName;
            }
            yield next;
        }
    };
}
exports.Nothing = strategy("Nothing", function* (state) {
    yield 1; // number isn't a `State`, so this should error.
    return state; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});
exports.Nothing1 = strategy("Nothing", function* (state) {
});
exports.Nothing2 = strategy("Nothing", function* (state) {
    return 1; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});
exports.Nothing3 = strategy("Nothing", function* (state) {
    yield state;
    return 1; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});
