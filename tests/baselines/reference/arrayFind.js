//// [arrayFind.ts]
// test fix for #18112, type guard predicates should narrow returned element
function isNumber(x: any): x is number {
  return typeof x === "number";
}

const arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
const foundNumber: number | undefined = arrayOfStringsNumbersAndBooleans.find(isNumber);

const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans as ReadonlyArray<string | number | boolean>;
const readonlyFoundNumber: number | undefined = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);



// Tests fix for #27496, predicates should not have to return booleans
const foo = [
  { name: 'bar' },
  { name: null },
  { name: 'baz' }
];

foo.find(x => x.name);

//// [arrayFind.js]
// test fix for #18112, type guard predicates should narrow returned element
function isNumber(x) {
    return typeof x === "number";
}
var arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
var foundNumber = arrayOfStringsNumbersAndBooleans.find(isNumber);
var readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans;
var readonlyFoundNumber = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);
// Tests fix for #27496, predicates should not have to return booleans
var foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
foo.find(function (x) { return x.name; });
