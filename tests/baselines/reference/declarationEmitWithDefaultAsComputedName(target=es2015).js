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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
const other_1 = __importDefault(require("./other"));
exports.obj = {
    [other_1.default.name]: 1,
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
