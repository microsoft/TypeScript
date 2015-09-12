// @declaration: true

function is(x: any, type: "number"): x is number;
function is(x: any, type: "string"): x is string;
function is(x: any, type: "boolean"): x is boolean;
function is(x: any, type: string): x is (number | boolean | string);
function is(x: any, type: string): boolean {
    if (["string", "number", "boolean"].indexOf(type) >= 0) {
        return typeof x === type;
    }

    return false;
}

declare function myRand(): boolean;

let strNumOrBool: string | number | boolean;

if (myRand()) {
    strNumOrBool = "abc";
}
else if (myRand()) {
    strNumOrBool = 100;
}
else {
    strNumOrBool = true;
}

if (is(strNumOrBool, "number")) {
    let num = strNumOrBool;
    num *= 100;
}

if (is(strNumOrBool, "string")) {
    let str = strNumOrBool;
    str = str.slice();
}

if (is(strNumOrBool, "boolean")) {
    let bool = strNumOrBool;
    bool = bool || bool && bool;
}