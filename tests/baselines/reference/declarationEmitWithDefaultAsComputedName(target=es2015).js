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

//// [other.js]
export default createExperiment({
    name: "foo"
});
//// [main.js]
import other from "./other";
export const obj = {
    [other.name]: 1,
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
