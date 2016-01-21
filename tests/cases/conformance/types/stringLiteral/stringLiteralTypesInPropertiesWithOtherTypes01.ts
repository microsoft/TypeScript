// @declaration: true
// @noImplicitAny: true

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
