//// [isArray.ts]
var maybeArray = [] as Array<number> | number;

if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
    const str: string = maybeArray[0]; // Expect error
    maybeArray.push(42); // OK
} else {
    maybeArray.toFixed(2); // OK
}


var maybeReadonlyArray = [] as ReadonlyArray<number> | number;

if (Array.isArray(maybeReadonlyArray)) {
    maybeReadonlyArray.length; // OK
    const str: string = maybeReadonlyArray[0]; // Expect error
    maybeReadonlyArray.push(42); // Expect error
} else {
    maybeReadonlyArray.toFixed(2); // OK
}


var readonlyArrayOrNullish: ReadonlyArray<number> | undefined | null;

if (Array.isArray(readonlyArrayOrNullish)) {
    readonlyArrayOrNullish.length; // OK
    const str: string = readonlyArrayOrNullish[0]; // Expect error
    readonlyArrayOrNullish.push(42); // Expect error
} else {
    readonlyArrayOrNullish.X; // Expect error
}


var someUnknown: unknown;

if (Array.isArray(someUnknown)) {
    someUnknown.length; // OK
    const str: string = someUnknown[0]; // OK
    someUnknown.push("anything"); // OK
}


var someAny: any;

if (Array.isArray(someAny)) {
    someAny.length; // OK
    const str: string = someAny[0]; // OK
    someAny.push("anything"); // OK
}


//// [isArray.js]
var maybeArray = [];
if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
    var str = maybeArray[0]; // Expect error
    maybeArray.push(42); // OK
}
else {
    maybeArray.toFixed(2); // OK
}
var maybeReadonlyArray = [];
if (Array.isArray(maybeReadonlyArray)) {
    maybeReadonlyArray.length; // OK
    var str = maybeReadonlyArray[0]; // Expect error
    maybeReadonlyArray.push(42); // Expect error
}
else {
    maybeReadonlyArray.toFixed(2); // OK
}
var readonlyArrayOrNullish;
if (Array.isArray(readonlyArrayOrNullish)) {
    readonlyArrayOrNullish.length; // OK
    var str = readonlyArrayOrNullish[0]; // Expect error
    readonlyArrayOrNullish.push(42); // Expect error
}
else {
    readonlyArrayOrNullish.X; // Expect error
}
var someUnknown;
if (Array.isArray(someUnknown)) {
    someUnknown.length; // OK
    var str = someUnknown[0]; // OK
    someUnknown.push("anything"); // OK
}
var someAny;
if (Array.isArray(someAny)) {
    someAny.length; // OK
    var str = someAny[0]; // OK
    someAny.push("anything"); // OK
}
