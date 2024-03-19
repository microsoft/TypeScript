//@module: commonjs
//@target: ES5

// @filename: m1.ts
var R: any
export default R = {
    "___": 30,
    "___hello": 21,
    "_hi": 40,
}

// @filename: m2.ts
import R from "./m1";
const { ___, ___hello, _hi } = R;
