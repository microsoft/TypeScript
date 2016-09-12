// @declaration: true

function getFalsyPrimitive(x: "string"): string;
function getFalsyPrimitive(x: "number"): number;
function getFalsyPrimitive(x: "boolean"): boolean;
function getFalsyPrimitive(x: "boolean" | "string"): boolean | string;
function getFalsyPrimitive(x: "boolean" | "number"): boolean | number;
function getFalsyPrimitive(x: "number" | "string"): number | string;
function getFalsyPrimitive(x: "number" | "string" | "boolean"): number | string | boolean;
function getFalsyPrimitive(x: string): string | number | boolean {
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

const string = "string"
const number = "number"
const boolean = "boolean"

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


