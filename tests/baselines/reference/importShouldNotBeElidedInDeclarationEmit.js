//// [tests/cases/compiler/importShouldNotBeElidedInDeclarationEmit.ts] ////

//// [reselect.d.ts]
export as namespace Reselect;

export type Selector<S, R> = (state: S) => R;

export type OutputSelector<S, R, C> = Selector<S, R> & {
  resultFunc: C;
  recomputations: () => number;
  resetRecomputations: () => number;
};

export type ParametricSelector<S, P, R> = (state: S, props: P, ...args: any[]) => R;

export type OutputParametricSelector<S, P, R, C> = ParametricSelector<S, P, R> & {
  resultFunc: C;
  recomputations: () => number;
  resetRecomputations: () => number;
};

/* one selector */
export function createSelector<S, R1, T>(
    selector: Selector<S, R1>,
    combiner: (res: R1) => T,
): OutputSelector<S, T, (res: R1) => T>;
export function createSelector<S, P, R1, T>(
    selector: ParametricSelector<S, P, R1>,
    combiner: (res: R1) => T,
): OutputParametricSelector<S, P, T, (res: R1) => T>;

/* two selectors */
export function createSelector<S, R1, R2, T>(
    selector1: Selector<S, R1>,
    selector2: Selector<S, R2>,
    combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S, T, (res1: R1, res2: R2) => T>;
export function createSelector<S, P, R1, R2, T>(
    selector1: ParametricSelector<S, P, R1>,
    selector2: ParametricSelector<S, P, R2>,
    combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2) => T>;

//// [index.ts]
import { createSelector } from "reselect";
/*
 * changing the import to
 * import * as reselect from 'reselect';
 * and accessing reselect.createSelector fixes the issue
*/
export interface State {
    a: string;
    b: number;
}
export const selector = createSelector<State, string, number, { out: string }>(
    state => state.a,
    state => state.b,
    (a, b) => {
        return {
            out: `${a}+${b}`
        };
    }
);
selector({ a: "string", b: 5 });

//// [index.js]
"use strict";
exports.__esModule = true;
var reselect_1 = require("reselect");
exports.selector = reselect_1.createSelector(function (state) { return state.a; }, function (state) { return state.b; }, function (a, b) {
    return {
        out: a + "+" + b
    };
});
exports.selector({ a: "string", b: 5 });


//// [index.d.ts]
export interface State {
    a: string;
    b: number;
}
export declare const selector: ((state: State) => {
    out: string;
}) & {
    resultFunc: (res1: string, res2: number) => {
        out: string;
    };
    recomputations: () => number;
    resetRecomputations: () => number;
};
