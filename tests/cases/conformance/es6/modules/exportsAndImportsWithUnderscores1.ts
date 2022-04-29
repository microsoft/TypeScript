//@module: commonjs
//@target: ES3

// @filename: m1.ts
var R: any
export default R = {
    "__": 20,
    "_": 10
    "___": 30
}

// @filename: m2.ts
import R from "./m1";
const { __, _, ___ } = R;
