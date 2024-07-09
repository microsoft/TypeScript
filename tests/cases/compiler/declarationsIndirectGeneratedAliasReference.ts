// @declaration: true
// @filename: node_modules/mod/ctor.d.ts
export interface Ctor {
    x: number;
}
export type ExtendedCtor<T> = {x: number, ext: T};
export interface CtorConstructor {
    extends<T>(x: T): ExtendedCtor<T extends unknown ? Ctor : undefined>;
}
export const Ctor: CtorConstructor;
// @filename: node_modules/mod/index.d.ts
import { Ctor } from "./ctor";
export default Ctor;
// @filename: index.ts
import * as ns from "mod";
const Ctor = ns.default;
export const MyComp = Ctor.extends({foo: "bar"});
