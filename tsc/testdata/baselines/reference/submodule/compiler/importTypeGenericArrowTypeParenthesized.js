//// [tests/cases/compiler/importTypeGenericArrowTypeParenthesized.ts] ////

//// [module.d.ts]
declare module "module" {
    export interface Modifier<T> { }

    export function fn<T>(x: T): Modifier<T>;
}
//// [index.ts]
import { fn } from "module";

export const fail1 = fn(<T>(x: T): T => x);
export const fail2 = fn(function<T>(x: T): T {
  return x;
});

export const works1 = fn((x: number) => x);
type MakeItWork = <T>(x: T) => T;
export const works2 = fn<MakeItWork>(x => x);


//// [index.js]
import { fn } from "module";
export const fail1 = fn((x) => x);
export const fail2 = fn(function (x) {
    return x;
});
export const works1 = fn((x) => x);
export const works2 = fn(x => x);


//// [index.d.ts]
export declare const fail1: import("module").Modifier<<T>(x: T) => T>;
export declare const fail2: import("module").Modifier<<T>(x: T) => T>;
export declare const works1: import("module").Modifier<(x: number) => number>;
type MakeItWork = <T>(x: T) => T;
export declare const works2: import("module").Modifier<MakeItWork>;
export {};
