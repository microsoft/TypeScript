//// [json.stringify.ts]
var value = null;
JSON.stringify(value, undefined, 2);
JSON.stringify(value, null, 2);
JSON.stringify(value, ["a", 1], 2);
JSON.stringify(value, (k) => undefined, 2);
JSON.stringify(() => {}, undefined, 2);
JSON.stringify(Symbol('s'), undefined, 2);
JSON.stringify(undefined, undefined, 2);

//// [json.stringify.js]
var value = null;
JSON.stringify(value, undefined, 2);
JSON.stringify(value, null, 2);
JSON.stringify(value, ["a", 1], 2);
JSON.stringify(value, function (k) { return undefined; }, 2);
JSON.stringify(function () { }, undefined, 2);
JSON.stringify(Symbol('s'), undefined, 2);
JSON.stringify(undefined, undefined, 2);
