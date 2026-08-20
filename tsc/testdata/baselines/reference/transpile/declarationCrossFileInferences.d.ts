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


//// [Diagnostics reported]
consumes.ts(3,12): error TS9013: Expression type can't be inferred with --isolatedDeclarations.


==== consumes.ts (1 errors) ====
    import {A} from "./defines.js";
    export function create() {
        return new A();
               ~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations.
!!! related TS9031 consumes.ts:2:17: Add a return type to the function declaration.
!!! related TS9035 consumes.ts:3:12: Add satisfies and a type assertion to this expression (satisfies T as T) to make the type explicit.
    }
//// [exposes.d.ts] ////
export declare const value: any;


//// [Diagnostics reported]
exposes.ts(2,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== exposes.ts (1 errors) ====
    import {create} from "./consumes.js";
    export const value = create();
                 ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 exposes.ts:2:14: Add a type annotation to the variable value.
