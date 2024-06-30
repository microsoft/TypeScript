// @declaration: true
// @filename: defines.ts
export class A {
    field = { x: 1 }
}
// @filename: consumes.ts
import {A} from "./defines.js";
export function create() {
    return new A();
}
// @filename: exposes.ts
import {create} from "./consumes.js";
export const value = create();