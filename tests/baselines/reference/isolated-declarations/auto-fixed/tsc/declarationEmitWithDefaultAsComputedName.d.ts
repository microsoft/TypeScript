//// [tests/cases/compiler/declarationEmitWithDefaultAsComputedName.ts] ////

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
import other from "./other";
export const obj = {
    [other.name]: 1,
};

/// [Declarations] ////



//// [main.d.ts]
export declare const obj: {
    foo: number;
};
//# sourceMappingURL=main.d.ts.map
//// [other.d.ts]
type Experiment<Name> = {
    name: Name;
};
declare const __default: Experiment<"foo">;
export default __default;
//# sourceMappingURL=other.d.ts.map