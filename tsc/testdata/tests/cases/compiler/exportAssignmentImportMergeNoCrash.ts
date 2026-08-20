// @module: commonjs
// @target: es2015
// @strict: false
// @filename: assignment.ts
export default {
    foo: 12
};

// @filename: user.ts
import Obj from "./assignment";

export const Obj = void Obj;
