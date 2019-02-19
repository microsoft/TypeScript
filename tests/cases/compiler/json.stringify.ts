// @strictNullChecks: true

var value = null;
JSON.stringify(value, undefined, 2);
JSON.stringify(value, null, 2);
JSON.stringify(value, ["a", 1], 2);
JSON.stringify(value, (k) => undefined, 2);
JSON.stringify(value, undefined, 2);

const isUndefined: string = JSON.stringify(undefined);
const maybeUndefined: string = JSON.stringify("apple" as string | undefined);
const isNotUndefined: string = JSON.stringify("banana");
