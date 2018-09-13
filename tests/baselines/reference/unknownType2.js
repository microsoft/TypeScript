//// [unknownType2.ts]
type isUnknown<T> = unknown extends T ? true : false;
type isTrue<T extends true> = T;

type SomeResponse = 'yes' | 'no' | 'idk';
let validate: (x: unknown) => SomeResponse = x => (x === 'yes' || x === 'no') ? x : 'idk'; // No error

const u: unknown = undefined;

declare const symb: unique symbol;

if (u === 5) {
    const y = u.toString(10);
}

if (u === true || u === false) {
    const someBool: boolean = u;
}

if (u === undefined) {
    const undef: undefined = u;
}

if (u === null) {
    const someNull: null = u;
}

if (u === symb) {
    const symbolAlias: typeof symb = u;
}

if (!(u === 42)) {
    type A = isTrue<isUnknown<typeof u>>
}

if (u !== 42) {
    type B = isTrue<isUnknown<typeof u>>
}

if (u == 42) {
    type C = isTrue<isUnknown<typeof u>>
}

if (u == true) {
    type D = isTrue<isUnknown<typeof u>>
}

if (u == Object) {
    type E = isTrue<isUnknown<typeof u>>
}

declare const aString: string;
declare const aBoolean: boolean;
declare const aNumber: number;
declare const anObject: object;
declare const anObjectLiteral: { x: number };
declare const aUnion: { x: number } | { y: string };
declare const anIntersection: { x: number } & { y: string };
declare const aFunction: () => number;

if (u === aString) {
    let uString: string = u;
}

if (u === aBoolean) {
    let uString: boolean = u;
}

if (u === aNumber) {
    let uNumber: number = u;
}

if (u === anObject) {
    let uObject: object = u;
}

if (u === anObjectLiteral) {
    let uObjectLiteral: object = u;
}

if (u === aUnion) {
    type unionDoesNotNarrow = isTrue<isUnknown<typeof u>>
}

if (u === anIntersection) {
    type intersectionDoesNotNarrow = isTrue<isUnknown<typeof u>>
}

if (u === aFunction) {
    let uFunction: object = u;
}

enum NumberEnum {
    A,
    B,
    C
}

enum StringEnum {
    A = "A",
    B = "B",
    C = "C"
}

if (u === NumberEnum || u === StringEnum) {
    let enumObj: object = u;
}

if(u === NumberEnum.A) {
    let a: NumberEnum.A = u
}

if(u === StringEnum.B) {
    let b: StringEnum.B = u
}


//// [unknownType2.js]
"use strict";
var validate = function (x) { return (x === 'yes' || x === 'no') ? x : 'idk'; }; // No error
var u = undefined;
if (u === 5) {
    var y = u.toString(10);
}
if (u === true || u === false) {
    var someBool = u;
}
if (u === undefined) {
    var undef = u;
}
if (u === null) {
    var someNull = u;
}
if (u === symb) {
    var symbolAlias = u;
}
if (!(u === 42)) {
}
if (u !== 42) {
}
if (u == 42) {
}
if (u == true) {
}
if (u == Object) {
}
if (u === aString) {
    var uString = u;
}
if (u === aBoolean) {
    var uString = u;
}
if (u === aNumber) {
    var uNumber = u;
}
if (u === anObject) {
    var uObject = u;
}
if (u === anObjectLiteral) {
    var uObjectLiteral = u;
}
if (u === aUnion) {
}
if (u === anIntersection) {
}
if (u === aFunction) {
    var uFunction = u;
}
var NumberEnum;
(function (NumberEnum) {
    NumberEnum[NumberEnum["A"] = 0] = "A";
    NumberEnum[NumberEnum["B"] = 1] = "B";
    NumberEnum[NumberEnum["C"] = 2] = "C";
})(NumberEnum || (NumberEnum = {}));
var StringEnum;
(function (StringEnum) {
    StringEnum["A"] = "A";
    StringEnum["B"] = "B";
    StringEnum["C"] = "C";
})(StringEnum || (StringEnum = {}));
if (u === NumberEnum || u === StringEnum) {
    var enumObj = u;
}
if (u === NumberEnum.A) {
    var a = u;
}
if (u === StringEnum.B) {
    var b = u;
}
