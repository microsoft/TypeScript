//// [json.stringify.ts]
var replacer = (k) => undefined;
var value = null;
JSON.stringify(value, undefined, 2);
JSON.stringify(value, null, 2);
JSON.stringify(value, ["a", 1], 2);
JSON.stringify(value, replacer, 2);
JSON.stringify(value, undefined, 2);
JSON.stringify(undefined);
JSON.stringify(undefined, replacer);
JSON.stringify(() => '');
JSON.stringify(() => '', replacer);
JSON.stringify({});
JSON.stringify({}, replacer);
JSON.stringify(new Object());
JSON.stringify(new Object(), replacer);
var anyValue: any;
JSON.stringify(anyValue);
JSON.stringify(anyValue, replacer);


//// [json.stringify.js]
var replacer = function (k) { return undefined; };
var value = null;
JSON.stringify(value, undefined, 2);
JSON.stringify(value, null, 2);
JSON.stringify(value, ["a", 1], 2);
JSON.stringify(value, replacer, 2);
JSON.stringify(value, undefined, 2);
JSON.stringify(undefined);
JSON.stringify(undefined, replacer);
JSON.stringify(function () { return ''; });
JSON.stringify(function () { return ''; }, replacer);
JSON.stringify({});
JSON.stringify({}, replacer);
JSON.stringify(new Object());
JSON.stringify(new Object(), replacer);
var anyValue;
JSON.stringify(anyValue);
JSON.stringify(anyValue, replacer);
