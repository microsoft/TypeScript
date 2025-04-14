//// [tests/cases/compiler/overloadedConstructorFixesInferencesAppropriately.ts] ////

//// [overloadedConstructorFixesInferencesAppropriately.ts]
interface Box<T> {
    v: T;
}

interface ErrorResult {
    readonly error: true
}

interface AsyncLoaderProps<TResult extends {}> {
    readonly asyncLoad: () => Box<TResult>;
    readonly children: (result: Exclude<TResult, ErrorResult>) => string;
}

class AsyncLoader<TResult extends {}> {
    constructor(props: string, context: any);
    constructor(props: AsyncLoaderProps<TResult>);
    constructor(...args: any[]) {}
}

function load(): Box<{ success: true } | ErrorResult> {
    return null as any;
}

new AsyncLoader({
    asyncLoad: load,
    children: result => result.success as any,
}); // should work fine


//// [overloadedConstructorFixesInferencesAppropriately.js]
"use strict";
var AsyncLoader = /** @class */ (function () {
    function AsyncLoader() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return AsyncLoader;
}());
function load() {
    return null;
}
new AsyncLoader({
    asyncLoad: load,
    children: function (result) { return result.success; },
}); // should work fine
