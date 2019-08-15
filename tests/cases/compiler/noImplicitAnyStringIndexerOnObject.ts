// @noimplicitany: true

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
