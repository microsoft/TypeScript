//// [tests/cases/compiler/declarationEmitWithDefaultAsComputedName.ts] ////

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
import other from "./other";
export const obj = {
    [other.name]: 1,
};

/// [Declarations] ////



//// [main.d.ts]
import other from "./other";
export declare const obj: {
    foo: number;
};

//// [other.d.ts]
declare const _default: invalid;
export default _default;

/// [Errors] ////

other.ts(7,16): error TS9037: Default exports can't be inferred with --isolatedDeclarations.


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
!!! error TS9037: Default exports can't be inferred with --isolatedDeclarations.
!!! related TS9036 other.ts:7:1: Move the expression in default export to a variable and add a type annotation to it.
    
==== main.ts (0 errors) ====
    import other from "./other";
    export const obj = {
        [other.name]: 1,
    };