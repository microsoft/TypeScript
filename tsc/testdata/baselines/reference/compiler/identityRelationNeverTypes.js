//// [tests/cases/compiler/identityRelationNeverTypes.ts] ////

//// [identityRelationNeverTypes.ts]
// Repro from #47996

type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;

declare class State<TContext> {
    _context: TContext;
    _value: string;
    matches<TSV extends string>(stateValue: TSV): this is State<TContext> & { value: TSV };
}

function f1(state: State<{ foo: number }>) {
    if (state.matches('a') && state.matches('a.b')) {
        state;  // never
        type T1 = Equals<typeof state, never>;  // true
        type T2 = Equals<never, never>;  // true
    }
}


//// [identityRelationNeverTypes.js]
"use strict";
// Repro from #47996
function f1(state) {
    if (state.matches('a') && state.matches('a.b')) {
        state; // never
    }
}


//// [identityRelationNeverTypes.d.ts]
type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;
declare class State<TContext> {
    _context: TContext;
    _value: string;
    matches<TSV extends string>(stateValue: TSV): this is State<TContext> & {
        value: TSV;
    };
}
declare function f1(state: State<{
    foo: number;
}>): void;
