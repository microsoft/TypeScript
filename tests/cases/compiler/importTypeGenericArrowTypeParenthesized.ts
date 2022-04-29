// @declaration: true
// @filename: module.d.ts
declare module "module" {
    export interface Modifier<T> { }

    export function fn<T>(x: T): Modifier<T>;
}
// @filename: index.ts
import { fn } from "module";

export const fail1 = fn(<T>(x: T): T => x);
export const fail2 = fn(function<T>(x: T): T {
  return x;
});

export const works1 = fn((x: number) => x);
type MakeItWork = <T>(x: T) => T;
export const works2 = fn<MakeItWork>(x => x);
