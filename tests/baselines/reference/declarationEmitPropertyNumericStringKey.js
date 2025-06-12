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
const STATUS = {
    ["404"]: "not found",
};
const hundredStr = "100";
const obj = { [hundredStr]: "foo" };
const hundredNum = 100;
const obj2 = { [hundredNum]: "bar" };


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
