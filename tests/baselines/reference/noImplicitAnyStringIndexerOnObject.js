//// [noImplicitAnyStringIndexerOnObject.ts]
var a = {}["hello"];
var b: string = { '': 'foo' }[''];

var c = {
  get: (key: string) => 'foobar'
};
c['hello'];
const foo = c['hello'];

var d = {
  set: (key: string) => 'foobar'
};
const bar = d['hello'];

var e = {
  set: (key: string) => 'foobar',
  get: (key: string) => 'foobar'
};
e['hello'] = 'modified';
e['hello'] += 1;
e['hello'] ++;

const o = { a: 0 };

declare const k: "a" | "b" | "c";
o[k];


declare const k2: "c";
o[k2];

declare const sym : unique symbol;
o[sym];

enum NumEnum { a, b }
let numEnumKey: NumEnum;
o[numEnumKey];


enum StrEnum { a = "a", b = "b" }
let strEnumKey: StrEnum;
o[strEnumKey];


//// [noImplicitAnyStringIndexerOnObject.js]
var a = {}["hello"];
var b = { '': 'foo' }[''];
var c = {
    get: function (key) { return 'foobar'; }
};
c['hello'];
var foo = c['hello'];
var d = {
    set: function (key) { return 'foobar'; }
};
var bar = d['hello'];
var e = {
    set: function (key) { return 'foobar'; },
    get: function (key) { return 'foobar'; }
};
e['hello'] = 'modified';
e['hello'] += 1;
e['hello']++;
var o = { a: 0 };
o[k];
o[k2];
o[sym];
var NumEnum;
(function (NumEnum) {
    NumEnum[NumEnum["a"] = 0] = "a";
    NumEnum[NumEnum["b"] = 1] = "b";
})(NumEnum || (NumEnum = {}));
var numEnumKey;
o[numEnumKey];
var StrEnum;
(function (StrEnum) {
    StrEnum["a"] = "a";
    StrEnum["b"] = "b";
})(StrEnum || (StrEnum = {}));
var strEnumKey;
o[strEnumKey];
