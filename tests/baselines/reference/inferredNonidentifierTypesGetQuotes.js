//// [inferredNonidentifierTypesGetQuotes.ts]
var x = [{ "a-b": "string" }, {}];

var y = [{ ["a-b"]: "string" }, {}];

//// [inferredNonidentifierTypesGetQuotes.js]
var x = [{ "a-b": "string" }, {}];
var y = [(_a = {}, _a["a-b"] = "string", _a), {}];
var _a;


//// [inferredNonidentifierTypesGetQuotes.d.ts]
declare var x: ({
    "a-b": string;
} | {
    "a-b"?: undefined;
})[];
declare var y: ({
    ["a-b"]: string;
} | {
    "a-b"?: undefined;
})[];
