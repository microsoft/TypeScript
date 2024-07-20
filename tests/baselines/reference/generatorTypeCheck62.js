//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck62.ts] ////

//// [generatorTypeCheck62.ts]
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

export const Nothing1: Strategy<State> = strategy("Nothing", function*(state: State) {
    return state; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});

export const Nothing2: Strategy<State> = strategy("Nothing", function*(state: State) {
    yield state;
});

export const Nothing3: Strategy<State> = strategy("Nothing", function* (state: State) {
    yield ;
    return state; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});
 

//// [generatorTypeCheck62.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nothing3 = exports.Nothing2 = exports.Nothing1 = void 0;
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
exports.Nothing1 = strategy("Nothing", function* (state) {
    return state; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});
exports.Nothing2 = strategy("Nothing", function* (state) {
    yield state;
});
exports.Nothing3 = strategy("Nothing", function* (state) {
    yield;
    return state; // `return`/`TReturn` isn't supported by `strategy`, so this should error.
});
