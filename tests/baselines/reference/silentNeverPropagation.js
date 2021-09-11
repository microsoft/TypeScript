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


//// [silentNeverPropagation.js]
"use strict";
// Repro from #45041
var breaks = convert(createModule({ a: 12 }, { foo: function () { return true; } }));
breaks.state.a;
breaks.state.z;
breaks.foo();


//// [silentNeverPropagation.d.ts]
declare type ModuleWithState<TState> = {
    state: TState;
};
declare type State = {
    a: number;
};
declare type MoreState = {
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
