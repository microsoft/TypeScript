//@module: commonjs
//@target: ES5

// @filename: m1.ts
declare var console: any;
export function _() {
    console.log("_");
}
export function __() {
    console.log("__");
}
export function ___() {
    console.log("___");
}
export function _hi() {
    console.log("_hi");
}
export function __proto() {
    console.log("__proto");
}
export function __esmodule() {
    console.log("__esmodule");
}
export function ___hello(){
    console.log("___hello");
}

// @filename: m2.ts
import {_, __, ___hello, __esmodule, __proto, _hi}  from "./m1";
_();
__();
___hello();
__esmodule();
__proto();
_hi();