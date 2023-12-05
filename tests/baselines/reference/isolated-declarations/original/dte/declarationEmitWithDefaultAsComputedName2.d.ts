//// [tests/cases/compiler/declarationEmitWithDefaultAsComputedName2.ts] ////

//// [other.ts]
type Experiment<Name> = {
    name: Name;
};
declare const createExperiment: <Name extends string>(
    options: Experiment<Name>
) => Experiment<Name>;
export default createExperiment({
    name: "foo"
});

//// [main.ts]
import * as other2 from "./other";
export const obj = {
    [other2.default.name]: 1
};

/// [Declarations] ////



//// [main.d.ts]
import * as other2 from "./other";
export declare const obj: {
    [other2.default.name]: number;
};

//// [other.d.ts]
declare const _default: invalid;
export default _default;

/// [Errors] ////

other.ts(7,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== other.ts (1 errors) ====
    type Experiment<Name> = {
        name: Name;
    };
    declare const createExperiment: <Name extends string>(
        options: Experiment<Name>
    ) => Experiment<Name>;
    export default createExperiment({
                   ~~~~~~~~~~~~~~~~~~
        name: "foo"
    ~~~~~~~~~~~~~~~
    });
    ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
==== main.ts (0 errors) ====
    import * as other2 from "./other";
    export const obj = {
        [other2.default.name]: 1
    };