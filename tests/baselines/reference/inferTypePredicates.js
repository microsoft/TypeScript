//// [tests/cases/compiler/inferTypePredicates.ts] ////

//// [inferTypePredicates.ts]
// https://github.com/microsoft/TypeScript/issues/16069

const numsOrNull = [1, 2, 3, 4, null];
const filteredNumsTruthy: number[] = numsOrNull.filter(x => !!x);  // should error
const filteredNumsNonNullish: number[] = numsOrNull.filter(x => x !== null);  // should ok

const evenSquaresInline: number[] =  // should error
    [1, 2, 3, 4]
        .map(x => x % 2 === 0 ? x * x : null)
        .filter(x => !!x); // tests truthiness, not non-nullishness

const isTruthy = (x: number | null) => !!x;

const evenSquares: number[] =  // should error
    [1, 2, 3, 4]
    .map(x => x % 2 === 0 ? x * x : null)
      .filter(isTruthy);

const evenSquaresNonNull: number[] =  // should ok
    [1, 2, 3, 4]
    .map(x => x % 2 === 0 ? x * x : null)
    .filter(x => x !== null);

function isNonNull(x: number | null) {
  return x !== null;
}

// factoring out a boolean works thanks to aliased discriminants
function isNonNullVar(x: number | null) {
  const ok = x !== null;
  return ok;
}

function isNonNullGeneric<T>(x: T) {
  return x !== null;
}

// Type guards can flow between functions
const myGuard = (o: string | undefined): o is string => !!o;
const mySecondGuard = (o: string | undefined) => myGuard(o);

// https://github.com/microsoft/TypeScript/issues/16069#issuecomment-1327449914
// This doesn't work because the false condition prevents type guard inference.
// Breaking up the filters does work.
type MyObj = { data?: string };
type MyArray = { list?: MyObj[] }[];
const myArray: MyArray = [];

const result = myArray
  .map((arr) => arr.list)
  .filter((arr) => arr && arr.length)
  .map((arr) => arr // should error
    .filter((obj) => obj && obj.data)
    .map(obj => JSON.parse(obj.data))  // should error
  );

const result2 = myArray
  .map((arr) => arr.list)
  .filter((arr) => !!arr)
  .filter(arr => arr.length)
  .map((arr) => arr  // should ok
    .filter((obj) => obj)
    // inferring a guard here would require https://github.com/microsoft/TypeScript/issues/42384
    .filter(obj => !!obj.data)
    .map(obj => JSON.parse(obj.data))
  );

// https://github.com/microsoft/TypeScript/issues/16069#issuecomment-1183547889
type Foo = {
  foo: string;
}
type Bar = Foo & {
  bar: string;
}

const list: (Foo | Bar)[] = [];
const resultBars: Bar[] = list.filter((value) => 'bar' in value);  // should ok

function isBarNonNull(x: Foo | Bar | null) {
  return ('bar' in x!);
}
const fooOrBar = list[0];
if (isBarNonNull(fooOrBar)) {
  const t: Bar = fooOrBar;  // should ok
}

// https://github.com/microsoft/TypeScript/issues/38390#issuecomment-626019466
// Ryan's example (currently legal):
const a = [1, "foo", 2, "bar"].filter(x => typeof x === "string");
a.push(10);

// Defer to explicit type guards, even when they're incorrect.
function backwardsGuard(x: number|string): x is number {
  return typeof x === 'string';
}

// Partition tests. The "false" case matters.
function isString(x: string | number) {
  return typeof x === 'string';
}

declare let strOrNum: string | number;
if (isString(strOrNum)) {
  let t: string = strOrNum;  // should ok
} else {
  let t: number = strOrNum;  // should ok
}

function flakyIsString(x: string | number) {
  return typeof x === 'string' && Math.random() > 0.5;
}
if (flakyIsString(strOrNum)) {
  let t: string = strOrNum;  // should error
} else {
  let t: number = strOrNum;  // should error
}

function isDate(x: object) {
  return x instanceof Date;
}
function flakyIsDate(x: object) {
  return x instanceof Date && Math.random() > 0.5;
}

declare let maybeDate: object;
if (isDate(maybeDate)) {
  let t: Date = maybeDate;  // should ok
} else {
  let t: object = maybeDate;  // should ok
}

if (flakyIsDate(maybeDate)) {
  let t: Date = maybeDate;  // should error
} else {
  let t: object = maybeDate;  // should ok
}

// This should not infer a type guard since the value on which we do the refinement
// is not related to the original parameter.
function irrelevantIsNumber(x: string | number) {
	x = Math.random() < 0.5 ? "string" : 123;
  return typeof x === 'string';
}
function irrelevantIsNumberDestructuring(x: string | number) {
	[x] = [Math.random() < 0.5 ? "string" : 123];
  return typeof x === 'string';
}

// Cannot infer a type guard for either param because of the false case.
function areBothNums(x: string|number, y: string|number) {
  return typeof x === 'number' && typeof y === 'number';
}

// Could potentially infer a type guard here but it would require more bookkeeping.
function doubleReturn(x: string|number) {
  if (typeof x === 'string') {
    return true;
  }
  return false;
}

function guardsOneButNotOthers(a: string|number, b: string|number, c: string|number) {
  return typeof b === 'string';
}

// Checks that there are no string escaping issues
function dunderguard(__x: number | string) {
  return typeof __x  === 'string';
}

// could infer a type guard here but it doesn't seem that helpful.
const booleanIdentity = (x: boolean) => x;

// we infer "x is number | true" which is accurate but of debatable utility.
const numOrBoolean = (x: number | boolean) => typeof x === 'number' || x;

// inferred guards in methods
interface NumberInferrer {
  isNumber(x: number | string): x is number;
}
class Inferrer implements NumberInferrer {
  isNumber(x: number | string) {  // should ok
    return typeof x === 'number';
  }
}
declare let numOrStr: number | string;
const inf = new Inferrer();
if (inf.isNumber(numOrStr)) {
  let t: number = numOrStr;  // should ok
} else {
  let t: string = numOrStr;  // should ok
}

// Type predicates are not inferred on "this"
class C1 {
  isC2() {
    return this instanceof C2;
  }
}
class C2 extends C1 {
  z = 0;
}
declare let c: C1;
if (c.isC2()) {
  let c2: C2 = c;  // should error
}

function doNotRefineDestructuredParam({x, y}: {x: number | null, y: number}) {
  return typeof x === 'number';
}

// The type predicate must remain valid when the function is called with subtypes.
function isShortString(x: unknown) {
  return typeof x === "string" && x.length < 10;
}

declare let str: string;
if (isShortString(str)) {
  str.charAt(0);  // should ok
} else {
  str.charAt(0);  // should ok
}

function isStringFromUnknown(x: unknown) {
  return typeof x === "string";
}
if (isStringFromUnknown(str)) {
  str.charAt(0);  // should OK
} else {
  let t: never = str;  // should OK
}

// infer a union type
function isNumOrStr(x: unknown) {
  return (typeof x === "number" || typeof x === "string");
}
declare let unk: unknown;
if (isNumOrStr(unk)) {
  let t: number | string = unk;  // should ok
}

// A function can be a type predicate even if it throws.
function assertAndPredicate(x: string | number | Date) {
  if (x instanceof Date) {
    throw new Error();
  }
  return typeof x === 'string';
}

declare let snd: string | number | Date;
if (assertAndPredicate(snd)) {
  let t: string = snd; // should error
}

function isNumberWithThis(this: Date, x: number | string) {
  return typeof x === 'number';
}

function narrowFromAny(x: any) {
  return typeof x === 'number';
}

const noInferenceFromRest = (...f: ["a" | "b"]) => f[0] === "a";
const noInferenceFromImpossibleRest = (...f: []) => typeof f === "undefined";

function inferWithRest(x: string | null, ...f: ["a", "b"]) {
  return typeof x === 'string';
}

// https://github.com/microsoft/TypeScript/issues/57947
declare const foobar:
  | { type: "foo"; foo: number }
  | { type: "bar"; bar: string };

const foobarPred = (fb: typeof foobar) => fb.type === "foo";
if (foobarPred(foobar)) {
  foobar.foo;
}

// https://github.com/microsoft/TypeScript/issues/60778
const arrTest: Array<number> = [1, 2, null, 3].filter(
  (x) => (x != null) satisfies boolean,
);

function isEmptyString(x: unknown) {
  const rv = x === "";
  return rv satisfies boolean;
}


//// [inferTypePredicates.js]
// https://github.com/microsoft/TypeScript/issues/16069
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var numsOrNull = [1, 2, 3, 4, null];
var filteredNumsTruthy = numsOrNull.filter(function (x) { return !!x; }); // should error
var filteredNumsNonNullish = numsOrNull.filter(function (x) { return x !== null; }); // should ok
var evenSquaresInline = // should error
 [1, 2, 3, 4]
    .map(function (x) { return x % 2 === 0 ? x * x : null; })
    .filter(function (x) { return !!x; }); // tests truthiness, not non-nullishness
var isTruthy = function (x) { return !!x; };
var evenSquares = // should error
 [1, 2, 3, 4]
    .map(function (x) { return x % 2 === 0 ? x * x : null; })
    .filter(isTruthy);
var evenSquaresNonNull = // should ok
 [1, 2, 3, 4]
    .map(function (x) { return x % 2 === 0 ? x * x : null; })
    .filter(function (x) { return x !== null; });
function isNonNull(x) {
    return x !== null;
}
// factoring out a boolean works thanks to aliased discriminants
function isNonNullVar(x) {
    var ok = x !== null;
    return ok;
}
function isNonNullGeneric(x) {
    return x !== null;
}
// Type guards can flow between functions
var myGuard = function (o) { return !!o; };
var mySecondGuard = function (o) { return myGuard(o); };
var myArray = [];
var result = myArray
    .map(function (arr) { return arr.list; })
    .filter(function (arr) { return arr && arr.length; })
    .map(function (arr) { return arr // should error
    .filter(function (obj) { return obj && obj.data; })
    .map(function (obj) { return JSON.parse(obj.data); }); } // should error
);
var result2 = myArray
    .map(function (arr) { return arr.list; })
    .filter(function (arr) { return !!arr; })
    .filter(function (arr) { return arr.length; })
    .map(function (arr) { return arr // should ok
    .filter(function (obj) { return obj; })
    // inferring a guard here would require https://github.com/microsoft/TypeScript/issues/42384
    .filter(function (obj) { return !!obj.data; })
    .map(function (obj) { return JSON.parse(obj.data); }); });
var list = [];
var resultBars = list.filter(function (value) { return 'bar' in value; }); // should ok
function isBarNonNull(x) {
    return ('bar' in x);
}
var fooOrBar = list[0];
if (isBarNonNull(fooOrBar)) {
    var t = fooOrBar; // should ok
}
// https://github.com/microsoft/TypeScript/issues/38390#issuecomment-626019466
// Ryan's example (currently legal):
var a = [1, "foo", 2, "bar"].filter(function (x) { return typeof x === "string"; });
a.push(10);
// Defer to explicit type guards, even when they're incorrect.
function backwardsGuard(x) {
    return typeof x === 'string';
}
// Partition tests. The "false" case matters.
function isString(x) {
    return typeof x === 'string';
}
if (isString(strOrNum)) {
    var t = strOrNum; // should ok
}
else {
    var t = strOrNum; // should ok
}
function flakyIsString(x) {
    return typeof x === 'string' && Math.random() > 0.5;
}
if (flakyIsString(strOrNum)) {
    var t = strOrNum; // should error
}
else {
    var t = strOrNum; // should error
}
function isDate(x) {
    return x instanceof Date;
}
function flakyIsDate(x) {
    return x instanceof Date && Math.random() > 0.5;
}
if (isDate(maybeDate)) {
    var t = maybeDate; // should ok
}
else {
    var t = maybeDate; // should ok
}
if (flakyIsDate(maybeDate)) {
    var t = maybeDate; // should error
}
else {
    var t = maybeDate; // should ok
}
// This should not infer a type guard since the value on which we do the refinement
// is not related to the original parameter.
function irrelevantIsNumber(x) {
    x = Math.random() < 0.5 ? "string" : 123;
    return typeof x === 'string';
}
function irrelevantIsNumberDestructuring(x) {
    x = [Math.random() < 0.5 ? "string" : 123][0];
    return typeof x === 'string';
}
// Cannot infer a type guard for either param because of the false case.
function areBothNums(x, y) {
    return typeof x === 'number' && typeof y === 'number';
}
// Could potentially infer a type guard here but it would require more bookkeeping.
function doubleReturn(x) {
    if (typeof x === 'string') {
        return true;
    }
    return false;
}
function guardsOneButNotOthers(a, b, c) {
    return typeof b === 'string';
}
// Checks that there are no string escaping issues
function dunderguard(__x) {
    return typeof __x === 'string';
}
// could infer a type guard here but it doesn't seem that helpful.
var booleanIdentity = function (x) { return x; };
// we infer "x is number | true" which is accurate but of debatable utility.
var numOrBoolean = function (x) { return typeof x === 'number' || x; };
var Inferrer = /** @class */ (function () {
    function Inferrer() {
    }
    Inferrer.prototype.isNumber = function (x) {
        return typeof x === 'number';
    };
    return Inferrer;
}());
var inf = new Inferrer();
if (inf.isNumber(numOrStr)) {
    var t = numOrStr; // should ok
}
else {
    var t = numOrStr; // should ok
}
// Type predicates are not inferred on "this"
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.isC2 = function () {
        return this instanceof C2;
    };
    return C1;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.z = 0;
        return _this;
    }
    return C2;
}(C1));
if (c.isC2()) {
    var c2 = c; // should error
}
function doNotRefineDestructuredParam(_a) {
    var x = _a.x, y = _a.y;
    return typeof x === 'number';
}
// The type predicate must remain valid when the function is called with subtypes.
function isShortString(x) {
    return typeof x === "string" && x.length < 10;
}
if (isShortString(str)) {
    str.charAt(0); // should ok
}
else {
    str.charAt(0); // should ok
}
function isStringFromUnknown(x) {
    return typeof x === "string";
}
if (isStringFromUnknown(str)) {
    str.charAt(0); // should OK
}
else {
    var t = str; // should OK
}
// infer a union type
function isNumOrStr(x) {
    return (typeof x === "number" || typeof x === "string");
}
if (isNumOrStr(unk)) {
    var t = unk; // should ok
}
// A function can be a type predicate even if it throws.
function assertAndPredicate(x) {
    if (x instanceof Date) {
        throw new Error();
    }
    return typeof x === 'string';
}
if (assertAndPredicate(snd)) {
    var t = snd; // should error
}
function isNumberWithThis(x) {
    return typeof x === 'number';
}
function narrowFromAny(x) {
    return typeof x === 'number';
}
var noInferenceFromRest = function () {
    var f = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        f[_i] = arguments[_i];
    }
    return f[0] === "a";
};
var noInferenceFromImpossibleRest = function () {
    var f = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        f[_i] = arguments[_i];
    }
    return typeof f === "undefined";
};
function inferWithRest(x) {
    var f = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        f[_i - 1] = arguments[_i];
    }
    return typeof x === 'string';
}
var foobarPred = function (fb) { return fb.type === "foo"; };
if (foobarPred(foobar)) {
    foobar.foo;
}
// https://github.com/microsoft/TypeScript/issues/60778
var arrTest = [1, 2, null, 3].filter(function (x) { return (x != null); });
function isEmptyString(x) {
    var rv = x === "";
    return rv;
}


//// [inferTypePredicates.d.ts]
declare const numsOrNull: (number | null)[];
declare const filteredNumsTruthy: number[];
declare const filteredNumsNonNullish: number[];
declare const evenSquaresInline: number[];
declare const isTruthy: (x: number | null) => boolean;
declare const evenSquares: number[];
declare const evenSquaresNonNull: number[];
declare function isNonNull(x: number | null): x is number;
declare function isNonNullVar(x: number | null): x is number;
declare function isNonNullGeneric<T>(x: T): x is T & ({} | undefined);
declare const myGuard: (o: string | undefined) => o is string;
declare const mySecondGuard: (o: string | undefined) => o is string;
type MyObj = {
    data?: string;
};
type MyArray = {
    list?: MyObj[];
}[];
declare const myArray: MyArray;
declare const result: any[][];
declare const result2: any[][];
type Foo = {
    foo: string;
};
type Bar = Foo & {
    bar: string;
};
declare const list: (Foo | Bar)[];
declare const resultBars: Bar[];
declare function isBarNonNull(x: Foo | Bar | null): x is Bar;
declare const fooOrBar: Foo | Bar;
declare const a: string[];
declare function backwardsGuard(x: number | string): x is number;
declare function isString(x: string | number): x is string;
declare let strOrNum: string | number;
declare function flakyIsString(x: string | number): boolean;
declare function isDate(x: object): x is Date;
declare function flakyIsDate(x: object): boolean;
declare let maybeDate: object;
declare function irrelevantIsNumber(x: string | number): boolean;
declare function irrelevantIsNumberDestructuring(x: string | number): boolean;
declare function areBothNums(x: string | number, y: string | number): boolean;
declare function doubleReturn(x: string | number): boolean;
declare function guardsOneButNotOthers(a: string | number, b: string | number, c: string | number): b is string;
declare function dunderguard(__x: number | string): __x is string;
declare const booleanIdentity: (x: boolean) => boolean;
declare const numOrBoolean: (x: number | boolean) => x is number | true;
interface NumberInferrer {
    isNumber(x: number | string): x is number;
}
declare class Inferrer implements NumberInferrer {
    isNumber(x: number | string): x is number;
}
declare let numOrStr: number | string;
declare const inf: Inferrer;
declare class C1 {
    isC2(): boolean;
}
declare class C2 extends C1 {
    z: number;
}
declare let c: C1;
declare function doNotRefineDestructuredParam({ x, y }: {
    x: number | null;
    y: number;
}): boolean;
declare function isShortString(x: unknown): boolean;
declare let str: string;
declare function isStringFromUnknown(x: unknown): x is string;
declare function isNumOrStr(x: unknown): x is string | number;
declare let unk: unknown;
declare function assertAndPredicate(x: string | number | Date): x is string;
declare let snd: string | number | Date;
declare function isNumberWithThis(this: Date, x: number | string): x is number;
declare function narrowFromAny(x: any): x is number;
declare const noInferenceFromRest: (...f: ["a" | "b"]) => boolean;
declare const noInferenceFromImpossibleRest: (...f: []) => boolean;
declare function inferWithRest(x: string | null, ...f: ["a", "b"]): x is string;
declare const foobar: {
    type: "foo";
    foo: number;
} | {
    type: "bar";
    bar: string;
};
declare const foobarPred: (fb: typeof foobar) => fb is {
    type: "foo";
    foo: number;
};
declare const arrTest: Array<number>;
declare function isEmptyString(x: unknown): x is "";
