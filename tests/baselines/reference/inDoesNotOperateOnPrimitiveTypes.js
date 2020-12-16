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
