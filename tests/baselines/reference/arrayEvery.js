//// [arrayEvery.ts]
declare const baseReadonlyArray: ReadonlyArray<number | string>;
const isNumber = (x: any): x is number => "number" === typeof x;

if (baseReadonlyArray.every<number>((x): x is number => "number" === typeof x)) {
  const numberReadonlyArray: ReadonlyArray<number> = baseReadonlyArray; // should be ReadonlyArray<number>
}
if (baseReadonlyArray.every<number>(isNumber)) {
  const numberReadonlyArray: ReadonlyArray<number> = baseReadonlyArray; // should be ReadonlyArray<number>
}

if (baseReadonlyArray.every((x: any): x is number => "number" === typeof x)) {
  const numberReadonlyArray: ReadonlyArray<number> = baseReadonlyArray; // should be ReadonlyArray<number>
}
if (baseReadonlyArray.every(isNumber)) {
  const numberReadonlyArray: ReadonlyArray<number> = baseReadonlyArray; // should be ReadonlyArray<number>
}

baseReadonlyArray.every(x => "number" === typeof x && x > 2);

//// [arrayEvery.js]
var isNumber = function (x) { return "number" === typeof x; };
if (baseReadonlyArray.every(function (x) { return "number" === typeof x; })) {
    var numberReadonlyArray = baseReadonlyArray; // should be ReadonlyArray<number>
}
if (baseReadonlyArray.every(isNumber)) {
    var numberReadonlyArray = baseReadonlyArray; // should be ReadonlyArray<number>
}
if (baseReadonlyArray.every(function (x) { return "number" === typeof x; })) {
    var numberReadonlyArray = baseReadonlyArray; // should be ReadonlyArray<number>
}
if (baseReadonlyArray.every(isNumber)) {
    var numberReadonlyArray = baseReadonlyArray; // should be ReadonlyArray<number>
}
baseReadonlyArray.every(function (x) { return "number" === typeof x && x > 2; });
