//// [tests/cases/compiler/esModuleIntersectionCrash.ts] ////

//// [mod.d.ts]
export = modObj;
declare const modObj: modObj.A & modObj.B;
declare namespace modObj {
    interface A { (): void; a: string; }
    interface B { (x: string): void; b: string; }
}
//// [idx.ts]
import * as mod from "./mod";
mod.a;
mod.b;

//// [idx.js]
import * as mod from "./mod";
mod.a;
mod.b;
