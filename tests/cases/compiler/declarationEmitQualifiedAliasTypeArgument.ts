// @declaration: true
// @filename: bbb.d.ts
export interface INode<T> {
    data: T;
}

export function create<T>(): () => INode<T>;
// @filename: lib.d.ts
export type G<T extends string> = { [P in T]: string };

export enum E {
    A = "a",
    B = "b"
}

export type T = G<E>;

export type Q = G<E.A>;

// @filename: index.ts
import { T, Q } from "./lib";
import { create } from "./bbb";

export const fun = create<T>();

export const fun2 = create<Q>();
