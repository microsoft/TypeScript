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

//// [other.js]
export default createExperiment({
    name: "foo"
});
//// [main.js]
import * as other2 from "./other";
export const obj = {
    [other2.default.name]: 1
};


//// [other.d.ts]
type Experiment<Name> = {
    name: Name;
};
declare const _default: Experiment<"foo">;
export default _default;
//// [main.d.ts]
export declare const obj: {
    foo: number;
};
