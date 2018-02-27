//// [inferredNonidentifierTypesGetQuotes.ts]
var x = [{ "a-b": "string" }, {}];

//// [inferredNonidentifierTypesGetQuotes.js]
var x = [{ "a-b": "string" }, {}];


//// [inferredNonidentifierTypesGetQuotes.d.ts]
declare var x: ({
    "a-b": string;
} | {
    "a-b"?: undefined;
})[];
