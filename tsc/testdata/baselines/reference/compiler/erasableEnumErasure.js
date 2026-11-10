//// [tests/cases/compiler/erasableEnumErasure.ts] ////

//// [erasableEnumErasure.ts]
const outer = 4;
const Numeric: enum = (({
    // Preserve member comments and ordinary JavaScript expressions.
    First: /* Preserve initializer comments. */ (1),
    Second: (outer + 1),
    Shifted: outer << 1,
}));
const StringValues: enum = {
    /** An enum member. */
    First: "first",
    Second: "second",
};
let numeric: Numeric = Numeric.First;
let member: Numeric.First = Numeric.First;
let text: StringValues = StringValues.Second;
const constMember = StringValues.First as const;
const constIndexed = StringValues["First"] as const;
const keys: keyof typeof StringValues = "First";
const object: typeof StringValues = StringValues;
function narrow(value: StringValues) {
    if (value === StringValues.First) {
        const first: StringValues.First = value;
        return first;
    }
    const second: StringValues.Second = value;
    return second;
}
function scoped() {
    const Local: enum = { Value: "local" };
    const value: Local.Value = Local.Value;
    return value as string;
}
namespace Types {
    export type Value = StringValues;
}

var Variable: enum = { Value: 1 };
const variable: Variable = Variable.Value;
declare const Ambient: enum = { A: 1, B: (0) };
const ambient: Ambient = Ambient.B;

// Enums without members have the never type, including prototype-only objects.
const Empty: enum = {};
declare const empty: Empty;
const emptyValue: never = empty;
const PrototypeOnly: enum = { __proto__: null };
declare const prototypeOnly: PrototypeOnly;
const prototypeOnlyValue: never = prototypeOnly;


//// [erasableEnumErasure.js]
"use strict";
const outer = 4;
const Numeric = (({
    // Preserve member comments and ordinary JavaScript expressions.
    First: /* Preserve initializer comments. */ (1),
    Second: (outer + 1),
    Shifted: outer << 1,
}));
const StringValues = {
    /** An enum member. */
    First: "first",
    Second: "second",
};
let numeric = Numeric.First;
let member = Numeric.First;
let text = StringValues.Second;
const constMember = StringValues.First;
const constIndexed = StringValues["First"];
const keys = "First";
const object = StringValues;
function narrow(value) {
    if (value === StringValues.First) {
        const first = value;
        return first;
    }
    const second = value;
    return second;
}
function scoped() {
    const Local = { Value: "local" };
    const value = Local.Value;
    return value;
}
var Variable = { Value: 1 };
const variable = Variable.Value;
const ambient = Ambient.B;
// Enums without members have the never type, including prototype-only objects.
const Empty = {};
const emptyValue = empty;
const PrototypeOnly = { __proto__: null };
const prototypeOnlyValue = prototypeOnly;


//// [erasableEnumErasure.d.ts]
declare const outer = 4;
declare const Numeric: enum = {
    First: 1,
    Second: 5,
    Shifted: 8
};
declare const StringValues: enum = {
    /** An enum member. */
    First: "first",
    Second: "second"
};
declare let numeric: Numeric;
declare let member: Numeric.First;
declare let text: StringValues;
declare const constMember: StringValues.First;
declare const constIndexed: StringValues.First;
declare const keys: keyof typeof StringValues;
declare const object: typeof StringValues;
declare function narrow(value: StringValues): StringValues;
declare function scoped(): string;
declare namespace Types {
    type Value = StringValues;
}
declare var Variable: enum = { Value: 1 };
declare const variable: Variable;
declare const Ambient: enum = { A: 1, B: 0 };
declare const ambient: Ambient;
declare const Empty: enum = {};
declare const empty: Empty;
declare const emptyValue: never;
declare const PrototypeOnly: enum = { __proto__: null };
declare const prototypeOnly: PrototypeOnly;
declare const prototypeOnlyValue: never;
