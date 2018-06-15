// @declaration: true
// @target: es5

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
import * as other2 from "./other";
export const obj = {
    [other2.default.name]: 1
};