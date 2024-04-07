// @strict: true
// @declaration: true
// @filename: node_modules/whatever/index.d.ts
export type Whatever<T> = {x: T};
export declare function something<T>(cb: () => Whatever<T>): Whatever<T>;

// @filename: index.ts
import * as E from 'whatever';

export const run = <E>(i: () => E.Whatever<E>): E.Whatever<E> => E.something(i);