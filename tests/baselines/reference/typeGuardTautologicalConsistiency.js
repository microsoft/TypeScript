//// [tests/cases/conformance/expressions/typeGuards/typeGuardTautologicalConsistiency.ts] ////

//// [typeGuardTautologicalConsistiency.ts]
let stringOrNumber: string | number;

if (typeof stringOrNumber === "number") {
    if (typeof stringOrNumber !== "number") {
        stringOrNumber;
    }
}

if (typeof stringOrNumber === "number" && typeof stringOrNumber !== "number") {
    stringOrNumber;
}


//// [typeGuardTautologicalConsistiency.js]
let stringOrNumber;
if (typeof stringOrNumber === "number") {
    if (typeof stringOrNumber !== "number") {
        stringOrNumber;
    }
}
if (typeof stringOrNumber === "number" && typeof stringOrNumber !== "number") {
    stringOrNumber;
}
