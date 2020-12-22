//// [inDoesNotOperateOnPrimitiveTypes.ts]
const validHasKey = <T extends object>(
  thing: T,
  key: string,
): boolean => {
  return key in thing;
};

const alsoValidHasKey = <T>(
  thing: T,
  key: string,
): boolean => {
  return key in thing;
};

function invalidHasKey<T extends string | number>(
  thing: T,
  key: string,
): boolean {
  return key in thing;
}

function union1<T extends string | number, U extends boolean>(thing: T | U) {
  "key" in thing; // Error (because all possible instantiations are errors)
}

function union2<T extends object, U extends string | number>(thing: T | U) {
  "key" in thing; // Error (because narrowing is possible)
  if (typeof thing === "object") {
    "key" in thing; // Ok
  }
}

function union3<T>(thing: T | string | number) {
  "key" in thing; // Error (because narrowing is possible)
  if (typeof thing !== "string" && typeof thing !== "number") {
    "key" in thing; // Ok, because further narrowing is impossible
  }
}

function union4<T extends object | "hello">(thing: T) {
  "key" in thing; // Error (because union includes string literal)
}

function union5<T extends object | string>(thing: T) {
  "key" in thing; // Error (because union includes string)
}

function intersection1<T extends number, U extends 0 | 1 | 2>(thing: T & U) {
  "key" in thing; // Error (because all possible instantiations are errors)
}

function intersection2<T>(thing: T & (0 | 1 | 2)) {
  "key" in thing; // Error (because all possible instantations are errors)
}


//// [inDoesNotOperateOnPrimitiveTypes.js]
var validHasKey = function (thing, key) {
    return key in thing;
};
var alsoValidHasKey = function (thing, key) {
    return key in thing;
};
function invalidHasKey(thing, key) {
    return key in thing;
}
function union1(thing) {
    "key" in thing; // Error (because all possible instantiations are errors)
}
function union2(thing) {
    "key" in thing; // Error (because narrowing is possible)
    if (typeof thing === "object") {
        "key" in thing; // Ok
    }
}
function union3(thing) {
    "key" in thing; // Error (because narrowing is possible)
    if (typeof thing !== "string" && typeof thing !== "number") {
        "key" in thing; // Ok, because further narrowing is impossible
    }
}
function union4(thing) {
    "key" in thing; // Error (because union includes string literal)
}
function union5(thing) {
    "key" in thing; // Error (because union includes string)
}
function intersection1(thing) {
    "key" in thing; // Error (because all possible instantiations are errors)
}
function intersection2(thing) {
    "key" in thing; // Error (because all possible instantations are errors)
}
