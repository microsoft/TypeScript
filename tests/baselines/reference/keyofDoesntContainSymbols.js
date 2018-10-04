//// [keyofDoesntContainSymbols.ts]
const sym = Symbol();
const num = 0;
const obj = { num: 0, str: 's', [num]: num as 0, [sym]: sym };

function set <T extends object, K extends keyof T> (obj: T, key: K, value: T[K]): T[K] {
  return obj[key] = value;
}

const val = set(obj, 'str', '');
// string
const valB = set(obj, 'num', '');
// Expect type error
// Argument of type '""' is not assignable to parameter of type 'number'.
const valC = set(obj, sym, sym);
// Expect type error
// Argument of type 'unique symbol' is not assignable to parameter of type "str" | "num"
const valD = set(obj, num, num);
// Expect type error
// Argument of type '0' is not assignable to parameter of type "str" | "num"
type KeyofObj = keyof typeof obj;
// "str" | "num"
type Values<T> = T[keyof T];

type ValuesOfObj = Values<typeof obj>;

//// [keyofDoesntContainSymbols.js]
var _a;
var sym = Symbol();
var num = 0;
var obj = (_a = { num: 0, str: 's' }, _a[num] = num, _a[sym] = sym, _a);
function set(obj, key, value) {
    return obj[key] = value;
}
var val = set(obj, 'str', '');
// string
var valB = set(obj, 'num', '');
// Expect type error
// Argument of type '""' is not assignable to parameter of type 'number'.
var valC = set(obj, sym, sym);
// Expect type error
// Argument of type 'unique symbol' is not assignable to parameter of type "str" | "num"
var valD = set(obj, num, num);
