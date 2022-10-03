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

{
  let e = {
    get: (key: string) => 'foobar',
    set: (key: string) => 'foobar'
  };
  e['hello'];
  e['hello'] = 'modified';
  e['hello'] += 1;
  e['hello'] ++;
}

{
  let e = {
    get: (key: string) => 'foobar',
    set: (key: string, value: string) => 'foobar'
  };
  e['hello'];
  e['hello'] = 'modified';
  e['hello'] += 1;
  e['hello'] ++;
}

{
  let e = {
    get: (key: "hello" | "world") => 'foobar',
    set: (key: "hello" | "world", value: string) => 'foobar'
  };
  e['hello'];
  e['hello'] = 'modified';
  e['hello'] += 1;
  e['hello'] ++;
}

{
  ({ get: (key: string) => 'hello', set: (key: string, value: string) => {} })['hello'];
  ({ get: (key: string) => 'hello', set: (key: string, value: string) => {} })['hello'] = 'modified';
  ({ get: (key: string) => 'hello', set: (key: string, value: string) => {} })['hello'] += 1;
  ({ get: (key: string) => 'hello', set: (key: string, value: string) => {} })['hello'] ++;
}

{
  ({ foo: { get: (key: string) => 'hello', set: (key: string, value: string) => {} } }).foo['hello'];
  ({ foo: { get: (key: string) => 'hello', set: (key: string, value: string) => {} } }).foo['hello'] = 'modified';
  ({ foo: { get: (key: string) => 'hello', set: (key: string, value: string) => {} } }).foo['hello'] += 1;
  ({ foo: { get: (key: string) => 'hello', set: (key: string, value: string) => {} } }).foo['hello'] ++;
}

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


interface MyMap<K, T> {
  get(key: K): T;
  set(key: K, value: T): void;
}

interface Dog { bark(): void; }
let rover: Dog = { bark() {} };

declare let map: MyMap<Dog, string>;
map[rover] = "Rover";

interface I {
  prop: MyMap<string, string>
}
declare const m: I;
m.prop['a'];


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
{
    var e = {
        get: function (key) { return 'foobar'; },
        set: function (key) { return 'foobar'; }
    };
    e['hello'];
    e['hello'] = 'modified';
    e['hello'] += 1;
    e['hello']++;
}
{
    var e = {
        get: function (key) { return 'foobar'; },
        set: function (key, value) { return 'foobar'; }
    };
    e['hello'];
    e['hello'] = 'modified';
    e['hello'] += 1;
    e['hello']++;
}
{
    var e = {
        get: function (key) { return 'foobar'; },
        set: function (key, value) { return 'foobar'; }
    };
    e['hello'];
    e['hello'] = 'modified';
    e['hello'] += 1;
    e['hello']++;
}
{
    ({ get: function (key) { return 'hello'; }, set: function (key, value) { } })['hello'];
    ({ get: function (key) { return 'hello'; }, set: function (key, value) { } })['hello'] = 'modified';
    ({ get: function (key) { return 'hello'; }, set: function (key, value) { } })['hello'] += 1;
    ({ get: function (key) { return 'hello'; }, set: function (key, value) { } })['hello']++;
}
{
    ({ foo: { get: function (key) { return 'hello'; }, set: function (key, value) { } } }).foo['hello'];
    ({ foo: { get: function (key) { return 'hello'; }, set: function (key, value) { } } }).foo['hello'] = 'modified';
    ({ foo: { get: function (key) { return 'hello'; }, set: function (key, value) { } } }).foo['hello'] += 1;
    ({ foo: { get: function (key) { return 'hello'; }, set: function (key, value) { } } }).foo['hello']++;
}
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
var rover = { bark: function () { } };
map[rover] = "Rover";
m.prop['a'];
