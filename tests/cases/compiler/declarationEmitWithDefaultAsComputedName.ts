// @declaration: true
// @target: es5
// @isolatedDeclarationFixedDiffReason: Printing differences

// @filename: other.ts
type Experiment<Name> = {
    name: Name;
};
declare const createExperiment: <Name extends string>(
    options: Experiment<Name>
) => Experiment<Name>;
export default createExperiment({
    name: "foo"
});

// @filename: main.ts
import other from "./other";
export const obj = {
    [other.name]: 1,
};