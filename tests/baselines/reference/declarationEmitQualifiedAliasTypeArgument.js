//// [tests/cases/compiler/declarationEmitQualifiedAliasTypeArgument.ts] ////

//// [bbb.d.ts]
export interface INode<T> {
    data: T;
}

export function create<T>(): () => INode<T>;
//// [lib.d.ts]
export type G<T extends string> = { [P in T]: string };

export enum E {
    A = "a",
    B = "b"
}

export type T = G<E>;

export type Q = G<E.A>;

//// [index.ts]
import { T, Q } from "./lib";
import { create } from "./bbb";

export const fun = create<T>();

export const fun2 = create<Q>();


//// [index.js]
"use strict";
exports.__esModule = true;
var bbb_1 = require("./bbb");
exports.fun = bbb_1.create();
exports.fun2 = bbb_1.create();


//// [index.d.ts]
export declare const fun: () => import("./bbb").INode<import("./lib").G<import("./lib").E>>;
export declare const fun2: () => import("./bbb").INode<import("./lib").G<import("./lib").E.A>>;
