//// [stringLiteralTypesInPropertiesWithOtherTypes01.ts]

interface Map<T> {
    [x: string]: number;
}

interface Option {
    // Intentionally omitting "boolean".
    kind: "string" | "number" | Map<number>;
}

let option: Option;

const constKind = option.kind;

let letKind = option.kind;
letKind = constKind;
letKind = varKind;
letKind = "string";
letKind = "number";
letKind = "boolean";
letKind = {};

var varKind = option.kind;
varKind = constKind;
varKind = letKind;
varKind = "string";
varKind = "number";
varKind = "boolean";
varKind = {};


//// [stringLiteralTypesInPropertiesWithOtherTypes01.js]
var option;
var constKind = option.kind;
var letKind = option.kind;
letKind = constKind;
letKind = varKind;
letKind = "string";
letKind = "number";
letKind = "boolean";
letKind = {};
var varKind = option.kind;
varKind = constKind;
varKind = letKind;
varKind = "string";
varKind = "number";
varKind = "boolean";
varKind = {};


//// [stringLiteralTypesInPropertiesWithOtherTypes01.d.ts]
interface Map<T> {
    [x: string]: number;
}
interface Option {
    kind: "string" | "number" | Map<number>;
}
declare let option: Option;
declare const constKind: "string" | "number" | Map<number>;
declare let letKind: "string" | "number" | Map<number>;
declare var varKind: "string" | "number" | Map<number>;
