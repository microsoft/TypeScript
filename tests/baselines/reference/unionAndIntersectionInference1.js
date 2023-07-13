//// [tests/cases/conformance/types/typeRelationships/typeInference/unionAndIntersectionInference1.ts] ////

//// [unionAndIntersectionInference1.ts]
// Repro from #2264

interface Y { 'i am a very certain type': Y }
var y: Y = <Y>undefined;
function destructure<a, r>(
    something: a | Y,
    haveValue: (value: a) => r,
    haveY: (value: Y) => r
): r {
    return something === y ? haveY(y) : haveValue(<a>something);
}

var value = Math.random() > 0.5 ? 'hey!' : <Y>undefined;

var result = destructure(value, text => 'string', y => 'other one'); // text: string, y: Y

// Repro from #4212

function isVoid<a>(value: void | a): value is void {
    return undefined;
}

function isNonVoid<a>(value: void | a) : value is a {
    return undefined;
}

function foo1<a>(value: void|a): void {
    if (isVoid(value)) {
        value; // value is void
    } else {
        value; // value is a
    }
}

function baz1<a>(value: void|a): void {
      if (isNonVoid(value)) {
          value; // value is a
      } else {
          value; // value is void
      }
}

// Repro from #5417

type Maybe<T> = T | void;

function get<U>(x: U | void): U {
   return null; // just an example
}

let foo: Maybe<string>;
get(foo).toUpperCase(); // Ok

// Repro from #5456

interface Man {
    walks: boolean;
}

interface Bear {
    roars: boolean;
}

interface Pig {
    oinks: boolean;
}

declare function pigify<T>(y: T & Bear): T & Pig;
declare var mbp: Man & Bear;

pigify(mbp).oinks; // OK, mbp is treated as Pig
pigify(mbp).walks; // Ok, mbp is treated as Man

// Repros from #29815

interface ITest {
  name: 'test'
}

const createTestAsync = (): Promise<ITest> => Promise.resolve().then(() => ({ name: 'test' }))

const createTest = (): ITest => {
  return { name: 'test' }
}

declare function f1<T, U>(x: T | U): T | U;
declare function f2<T, U>(x: T, y: U): T | U;

let x1: string = f1('a');
let x2: string = f2('a', 'b');

// Repro from #30442

const func = <T>() => {};
const assign = <T, U>(a: T, b: U) => Object.assign(a, b);
const res: (() => void) & { func: any } = assign(() => {}, { func });


//// [unionAndIntersectionInference1.js]
// Repro from #2264
var y = undefined;
function destructure(something, haveValue, haveY) {
    return something === y ? haveY(y) : haveValue(something);
}
var value = Math.random() > 0.5 ? 'hey!' : undefined;
var result = destructure(value, text => 'string', y => 'other one'); // text: string, y: Y
// Repro from #4212
function isVoid(value) {
    return undefined;
}
function isNonVoid(value) {
    return undefined;
}
function foo1(value) {
    if (isVoid(value)) {
        value; // value is void
    }
    else {
        value; // value is a
    }
}
function baz1(value) {
    if (isNonVoid(value)) {
        value; // value is a
    }
    else {
        value; // value is void
    }
}
function get(x) {
    return null; // just an example
}
let foo;
get(foo).toUpperCase(); // Ok
pigify(mbp).oinks; // OK, mbp is treated as Pig
pigify(mbp).walks; // Ok, mbp is treated as Man
const createTestAsync = () => Promise.resolve().then(() => ({ name: 'test' }));
const createTest = () => {
    return { name: 'test' };
};
let x1 = f1('a');
let x2 = f2('a', 'b');
// Repro from #30442
const func = () => { };
const assign = (a, b) => Object.assign(a, b);
const res = assign(() => { }, { func });
