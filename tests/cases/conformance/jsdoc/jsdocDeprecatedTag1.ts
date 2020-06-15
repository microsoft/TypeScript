// @declaration: true
// @Filename: a.ts
export namespace foo {
    /** @deprecated */
    export function faff () { }
    faff()
}
const a = foo.faff() 
foo["faff"]
const { faff } = foo
faff()
/** @deprecated */
export function bar () {
    foo?.faff()
}
foo?.["faff"]?.()
bar();
/** @deprecated */
export interface Foo {
    /** @deprecated */
    zzz: number
}
/** @deprecated */
export type QW = Foo["zzz"]
export type WQ = QW

// @Filename: b.ts
import * as f from './a';
import { bar, QW } from './a';
f.bar();
f.foo.faff();
bar();
type Z = QW;
type A = f.Foo;
type B = f.QW;
type C = f.WQ;
type O = Z | A | B | C;