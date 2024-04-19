//// [defines.ts] ////
export class A {
    field = { x: 1 }
}
//// [consumes.ts] ////
import {A} from "./defines.js";
export function create() {
    return new A();
}
//// [exposes.ts] ////
import {create} from "./consumes.js";
export const value = create();
//// [defines.d.ts] ////
export declare class A {
    field: {
        x: number;
    };
}
//// [consumes.d.ts] ////
export declare function create(): any;
//// [exposes.d.ts] ////
export declare const value: any;
