//// [tests/cases/compiler/inferredNonidentifierTypesGetQuotes.ts] ////

//// [inferredNonidentifierTypesGetQuotes.ts]
var x = [{ "a-b": "string" }, {}];

var y = [{ ["a-b"]: "string" }, {}];

//// [inferredNonidentifierTypesGetQuotes.js]
var x = [{ "a-b": "string" }, {}];
var y = [{ ["a-b"]: "string" }, {}];


//// [inferredNonidentifierTypesGetQuotes.d.ts]
declare var x: ({
    "a-b": string;
} | {
    "a-b"?: undefined;
})[];
declare var y: ({
    "a-b": string;
} | {
    "a-b"?: undefined;
})[];
