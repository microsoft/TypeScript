//// [tests/cases/compiler/defaultDeclarationEmitDefaultImport.ts] ////

//// [root.ts]
export function getSomething(): Something { return null as any }
export default class Something {}
//// [main.ts]
import Thing, { getSomething } from "./root";
export const instance = getSomething();


//// [root.js]
export function getSomething() { return null; }
export default class Something {
}
//// [main.js]
import { getSomething } from "./root";
export const instance = getSomething();


//// [root.d.ts]
export declare function getSomething(): Something;
export default class Something {
}
//// [main.d.ts]
import Thing from "./root";
export declare const instance: Thing;
