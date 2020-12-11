//// [inDoesNotOperateOnPrimitiveTypes.ts]
const validHasKey = <A extends object>(
  thing: A,
  key: string,
): boolean => {
  return key in thing;
};

const invalidHasKey = <A>(
  thing: A,
  key: string,
): boolean => {
  return key in thing;
};


//// [inDoesNotOperateOnPrimitiveTypes.js]
var validHasKey = function (thing, key) {
    return key in thing;
};
var invalidHasKey = function (thing, key) {
    return key in thing;
};
