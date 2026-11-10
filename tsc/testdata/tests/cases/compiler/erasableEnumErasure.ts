// @strict: true
// @erasableSyntaxOnly: true
// @target: esnext
// @declaration: true

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
