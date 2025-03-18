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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createExperiment({
    name: "foo"
});
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
const other_1 = require("./other");
exports.obj = {
    [other_1.default.name]: 1,
};
