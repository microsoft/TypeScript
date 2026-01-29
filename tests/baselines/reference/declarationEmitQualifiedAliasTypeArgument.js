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
import { create } from "./bbb";
export const fun = create();
export const fun2 = create();


//// [index.d.ts]
import { T, Q } from "./lib";
export declare const fun: () => import("./bbb").INode<T>;
export declare const fun2: () => import("./bbb").INode<Q>;
