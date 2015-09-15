//// [overloadsWithTypePredicates03.ts]

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

//// [overloadsWithTypePredicates03.js]
function is(x, type) {
    if (["string", "number", "boolean"].indexOf(type) >= 0) {
        return typeof x === type;
    }
    return false;
}
var strNumOrBool;
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
    var num = strNumOrBool;
    num *= 100;
}
if (is(strNumOrBool, "string")) {
    var str = strNumOrBool;
    str = str.slice();
}
if (is(strNumOrBool, "boolean")) {
    var bool = strNumOrBool;
    bool = bool || bool && bool;
}


//// [overloadsWithTypePredicates03.d.ts]
declare function is(x: any, type: "number"): x is number;
declare function is(x: any, type: "string"): x is string;
declare function is(x: any, type: "boolean"): x is boolean;
declare function is(x: any, type: string): x is (number | boolean | string);
declare function myRand(): boolean;
declare let strNumOrBool: string | number | boolean;
