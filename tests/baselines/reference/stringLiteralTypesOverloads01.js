//// [stringLiteralTypesOverloads01.ts]
type PrimitiveName = 'string' | 'number' | 'boolean';

function getFalsyPrimitive(x: "string"): string;
function getFalsyPrimitive(x: "number"): number;
function getFalsyPrimitive(x: "boolean"): boolean;
function getFalsyPrimitive(x: "boolean" | "string"): boolean | string;
function getFalsyPrimitive(x: "boolean" | "number"): boolean | number;
function getFalsyPrimitive(x: "number" | "string"): number | string;
function getFalsyPrimitive(x: "number" | "string" | "boolean"): number | string | boolean;
function getFalsyPrimitive(x: PrimitiveName): number | string | boolean {
    if (x === "string") {
        return "";
    }
    if (x === "number") {
        return 0;
    }
    if (x === "boolean") {
        return false;
    }

    // Should be unreachable.
    throw "Invalid value";
}

namespace Consts1 {
    const EMPTY_STRING = getFalsyPrimitive("string");
    const ZERO = getFalsyPrimitive('number');
    const FALSE = getFalsyPrimitive("boolean");
}

const string: "string" = "string"
const number: "number" = "number"
const boolean: "boolean" = "boolean"

const stringOrNumber = string || number;
const stringOrBoolean = string || boolean;
const booleanOrNumber = number || boolean;
const stringOrBooleanOrNumber = stringOrBoolean || number;

namespace Consts2 {
    const EMPTY_STRING = getFalsyPrimitive(string);
    const ZERO = getFalsyPrimitive(number);
    const FALSE = getFalsyPrimitive(boolean);

    const a = getFalsyPrimitive(stringOrNumber);
    const b = getFalsyPrimitive(stringOrBoolean);
    const c = getFalsyPrimitive(booleanOrNumber);
    const d = getFalsyPrimitive(stringOrBooleanOrNumber);
}




//// [stringLiteralTypesOverloads01.js]
function getFalsyPrimitive(x) {
    if (x === "string") {
        return "";
    }
    if (x === "number") {
        return 0;
    }
    if (x === "boolean") {
        return false;
    }
    // Should be unreachable.
    throw "Invalid value";
}
var Consts1;
(function (Consts1) {
    var EMPTY_STRING = getFalsyPrimitive("string");
    var ZERO = getFalsyPrimitive('number');
    var FALSE = getFalsyPrimitive("boolean");
})(Consts1 || (Consts1 = {}));
var string = "string";
var number = "number";
var boolean = "boolean";
var stringOrNumber = string || number;
var stringOrBoolean = string || boolean;
var booleanOrNumber = number || boolean;
var stringOrBooleanOrNumber = stringOrBoolean || number;
var Consts2;
(function (Consts2) {
    var EMPTY_STRING = getFalsyPrimitive(string);
    var ZERO = getFalsyPrimitive(number);
    var FALSE = getFalsyPrimitive(boolean);
    var a = getFalsyPrimitive(stringOrNumber);
    var b = getFalsyPrimitive(stringOrBoolean);
    var c = getFalsyPrimitive(booleanOrNumber);
    var d = getFalsyPrimitive(stringOrBooleanOrNumber);
})(Consts2 || (Consts2 = {}));


//// [stringLiteralTypesOverloads01.d.ts]
declare type PrimitiveName = 'string' | 'number' | 'boolean';
declare function getFalsyPrimitive(x: "string"): string;
declare function getFalsyPrimitive(x: "number"): number;
declare function getFalsyPrimitive(x: "boolean"): boolean;
declare function getFalsyPrimitive(x: "boolean" | "string"): boolean | string;
declare function getFalsyPrimitive(x: "boolean" | "number"): boolean | number;
declare function getFalsyPrimitive(x: "number" | "string"): number | string;
declare function getFalsyPrimitive(x: "number" | "string" | "boolean"): number | string | boolean;
declare namespace Consts1 {
}
declare const string: "string";
declare const number: "number";
declare const boolean: "boolean";
declare const stringOrNumber: "string" | "number";
declare const stringOrBoolean: "string" | "boolean";
declare const booleanOrNumber: "number" | "boolean";
declare const stringOrBooleanOrNumber: "string" | "number" | "boolean";
declare namespace Consts2 {
}
