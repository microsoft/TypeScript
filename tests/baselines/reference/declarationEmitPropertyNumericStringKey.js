//// [tests/cases/compiler/declarationEmitPropertyNumericStringKey.ts] ////

//// [declarationEmitPropertyNumericStringKey.ts]
// https://github.com/microsoft/TypeScript/issues/55292

const STATUS = {
    ["404"]: "not found",
} as const;

const hundredStr = "100";
const obj = { [hundredStr]: "foo" };

const hundredNum = 100;
const obj2 = { [hundredNum]: "bar" };


//// [declarationEmitPropertyNumericStringKey.js]
// https://github.com/microsoft/TypeScript/issues/55292
var _a, _b, _c;
var STATUS = (_a = {},
    _a["404"] = "not found",
    _a);
var hundredStr = "100";
var obj = (_b = {}, _b[hundredStr] = "foo", _b);
var hundredNum = 100;
var obj2 = (_c = {}, _c[hundredNum] = "bar", _c);


//// [declarationEmitPropertyNumericStringKey.d.ts]
declare const STATUS: {
    readonly "404": "not found";
};
declare const hundredStr = "100";
declare const obj: {
    "100": string;
};
declare const hundredNum = 100;
declare const obj2: {
    100: string;
};
