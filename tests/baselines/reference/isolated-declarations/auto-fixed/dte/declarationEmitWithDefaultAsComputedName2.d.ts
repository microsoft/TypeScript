//// [tests/cases/compiler/declarationEmitWithDefaultAsComputedName2.ts] ////

//// [other.ts]
type Experiment<Name> = {
    name: Name;
};
declare const createExperiment: <Name extends string>(
    options: Experiment<Name>
) => Experiment<Name>;
const __default: Experiment<"foo"> = createExperiment({
    name: "foo"
});
export default __default;

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
//# sourceMappingURL=main.d.ts.map
//// [other.d.ts]
type Experiment<Name> = {
    name: Name;
};
declare const __default: Experiment<"foo">;
export default __default;
//# sourceMappingURL=other.d.ts.map