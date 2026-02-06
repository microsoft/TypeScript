//@module: commonjs
//@target: ES5, ES2015

// @filename: m1.ts
var R: any
export default R = {
    "__esmodule": true,
    "__proto__": {}
}

// @filename: m2.ts
import R from "./m1";
const { __esmodule, __proto__ } = R;
