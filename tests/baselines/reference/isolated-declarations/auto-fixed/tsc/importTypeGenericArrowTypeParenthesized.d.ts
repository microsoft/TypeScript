//// [tests/cases/compiler/importTypeGenericArrowTypeParenthesized.ts] ////

//// [module.d.ts]
declare module "module" {
    export interface Modifier<T> { }

    export function fn<T>(x: T): Modifier<T>;
}
//// [index.ts]
import { Modifier, fn } from "module";

export const fail1: Modifier<(<T>(x: T) => T)> = fn(<T>(x: T): T => x);
export const fail2: Modifier<(<T>(x: T) => T)> = fn(function<T>(x: T): T {
  return x;
});

export const works1: Modifier<(x: number) => number> = fn((x: number) => x);
type MakeItWork = <T>(x: T) => T;
export const works2: Modifier<MakeItWork> = fn<MakeItWork>(x => x);


/// [Declarations] ////



//// [index.d.ts]
/// <reference path="module.d.ts" />
import { Modifier } from "module";
export declare const fail1: Modifier<(<T>(x: T) => T)>;
export declare const fail2: Modifier<(<T>(x: T) => T)>;
export declare const works1: Modifier<(x: number) => number>;
type MakeItWork = <T>(x: T) => T;
export declare const works2: Modifier<MakeItWork>;
export {};
//# sourceMappingURL=index.d.ts.map