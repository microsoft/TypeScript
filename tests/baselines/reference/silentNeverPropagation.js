//// [tests/cases/compiler/silentNeverPropagation.ts] ////

//// [silentNeverPropagation.ts]
// Repro from #45041

type ModuleWithState<TState> = {
    state: TState;
};

type State = {
    a: number;
};

type MoreState = {
    z: string;
};

declare function createModule<TState, TActions>(state: TState, actions: TActions): ModuleWithState<TState> & TActions;

declare function convert<TState, TActions>(m: ModuleWithState<TState> & TActions): ModuleWithState<TState & MoreState> & TActions;

const breaks = convert(
    createModule({ a: 12 }, { foo() { return true } })
);

breaks.state.a
breaks.state.z
breaks.foo()

declare function inner<T1, t2>(t1: T1, t2: t2): T1 | t2;
declare function outer<T1, T2>(m: T1 | T2): [T1, T2];

const outerResult = outer(
    inner({ a: 12 }, { foo() { return true } })
);

//// [silentNeverPropagation.js]
"use strict";
// Repro from #45041
var breaks = convert(createModule({ a: 12 }, { foo: function () { return true; } }));
breaks.state.a;
breaks.state.z;
breaks.foo();
var outerResult = outer(inner({ a: 12 }, { foo: function () { return true; } }));


//// [silentNeverPropagation.d.ts]
type ModuleWithState<TState> = {
    state: TState;
};
type State = {
    a: number;
};
type MoreState = {
    z: string;
};
declare function createModule<TState, TActions>(state: TState, actions: TActions): ModuleWithState<TState> & TActions;
declare function convert<TState, TActions>(m: ModuleWithState<TState> & TActions): ModuleWithState<TState & MoreState> & TActions;
declare const breaks: ModuleWithState<{
    a: number;
} & MoreState> & ModuleWithState<{
    a: number;
}> & {
    foo(): true;
};
declare function inner<T1, t2>(t1: T1, t2: t2): T1 | t2;
declare function outer<T1, T2>(m: T1 | T2): [T1, T2];
declare const outerResult: [{
    a: number;
} | {
    foo(): true;
}, {
    a: number;
} | {
    foo(): true;
}];
