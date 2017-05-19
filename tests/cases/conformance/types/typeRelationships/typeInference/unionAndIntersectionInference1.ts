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
