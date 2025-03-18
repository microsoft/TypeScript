//// [tests/cases/compiler/arrayFind.ts] ////

//// [arrayFind.ts]
// test fix for #18112, type guard predicates should narrow returned element
function isNumber(x: any): x is number {
  return typeof x === "number";
}

const arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
const foundNumber: number | undefined = arrayOfStringsNumbersAndBooleans.find(isNumber);

const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans as ReadonlyArray<string | number | boolean>;
const readonlyFoundNumber: number | undefined = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);


//// [arrayFind.js]
function isNumber(x) {
    return typeof x === "number";
}
const arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
const foundNumber = arrayOfStringsNumbersAndBooleans.find(isNumber);
const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans;
const readonlyFoundNumber = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);
