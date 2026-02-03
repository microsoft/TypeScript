//// [tests/cases/compiler/instantiationExpressionErrorNoCrash.ts] ////

//// [instantiationExpressionErrorNoCrash.ts]
const createCacheReducer = <N extends string, QR>(
    queries: Cache<N, QR>["queries"],
) => {
    const queriesMap = {} as QR;

    const initialState = {
        queries: queriesMap,
    };

    return (state = initialState) => state;
};

export type Cache<N extends string, QR> = {
    queries: {
        [QK in keyof QR]: ReturnType<typeof createCacheReducer<QR>>;
    };
};

//// [instantiationExpressionErrorNoCrash.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCacheReducer = function (queries) {
    var queriesMap = {};
    var initialState = {
        queries: queriesMap,
    };
    return function (state) {
        if (state === void 0) { state = initialState; }
        return state;
    };
};
