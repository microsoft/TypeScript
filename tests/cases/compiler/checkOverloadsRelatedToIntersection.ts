// @strict: true
// @target: esnext


/**********************/
// @filename:-57087-101.ts

namespace ns0 {
interface FMap<T,R> {
    f:(x:T)=>R
    g(f:(x:T)=>R):R;
}
declare const x1: FMap<1|2,1|2>;
x1.g(x1.f); // no error
declare const x2: FMap<2|3,"2"|"3">;
x2.g(x2.f); // no error
const x = Math.random() < 0.5 ? x1 : x2;
x.g; // (method) FMap<T, R>.g(f: ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3")): 1 | 2 | "2" | "3"

/*
 * Exact expansion of x.g, with the intersection of the two function types expanded.
 * Catch-all with "never" return is not required to pass the test.
 */
function ft0(x:1|2):1|2;
function ft0(x:2|3):"2"|"3";
function ft0(x:1|2|3){
    if (x!==3) return x1.f(x);
    else return x2.f(x);
}
x.g(ft0); // should not be error

/*
 * Condtion for passing are:
 * (a1) Every source overload is matches at least one target overload
 * (a2) Every target overload is matched by at least one souce overload
 * where "matching" is defined as
 * (b1) the target result is void OR the target result and source result overlap // should be source result subset of target result ?
 * (b2) the target and source parameters match identically up to the number of required source parameters.
 * This test case fails because: source (x:1) is not identical to target (x:1|2) or (x:2|3)
 */

function ft1(x:1):1;
function ft1(x:2):2;
function ft1(x:3):"3";
function ft1(x:1|2|3) {
    switch (x) {
        case 1: return 1;
        case 2: return 2;
        case 3: return "3";
    }
    throw "unexpected error"
}
x.g(ft1); // should be error


}


/**********************/
// @filename:-57087-102.ts

namespace ns1 {
interface FMap<T,R> {
    f:(x:T)=>R
    g(f:(x:T)=>R):R;
}
declare const x1: FMap<1|2,1|2>;
x1.g(x1.f); // no error
declare const x2: FMap<2|3,"2"|"3">;
x2.g(x2.f); // no error
const x = Math.random() < 0.5 ? x1 : x2;
x.g; // (method) FMap<T, R>.g(f: ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3")): 1 | 2 | "2" | "3"


/**
 * The following function ft3 should fail.  However, it currently does not
 * The new code only handles cases that fail the in the original code.
 * However, using such long overload chains is not desireable anyway - so we don't need to fix this?
 * Maybe fail on when the number of source overloads is greater than the total number of target overloads?
 */

function ft3(x:1):"3"; // should cause x.g(ft3) to error
function ft3(x:3):"3";
function ft3(x:2):2|"2";
function ft3(x:1|2):1|2; // (4) identical to x1.f
function ft3(x:2|3):"2"|"3"; // (5) identical to x2.f
function ft3(x:1|2|3){
    if (x===1) return x1.f(x);
    if (x===3) return x2.f(x);
    return Math.random() < 0.5 ? x1.f(x) : x2.f(x);
}
x.g(ft3); // should error (but currently doesn't)

/**
 * The following function ft4 should not fail, and it currently does not.
 * However, using such long overload chains is not friendly anyway, so it is irrelevant.
 */

function ft4(x:1):1;
function ft4(x:3):"3";
function ft4(x:2):2|"2";
function ft4(x:1|2):1|2; // (4) identical to x1.f
function ft4(x:2|3):"2"|"3"; // (5) identical to x2.f
function ft4(x:1|2|3){
    if (x===1) return x1.f(x);
    if (x===3) return x2.f(x);
    return Math.random() < 0.5 ? x1.f(x) : x2.f(x);
}
x.g(ft4); // should not error


}


/**********************/
// @filename:-57087-104.ts

namespace ns2 {
interface C {
  (x:1):"1";
  (x:2):"20";
  (x:number):number | "1" | "20";
};
interface B {
  (x:2):"2"
  (x:3):"30"
  (x:number):number | "2" | "30";
};
interface A {
  (x:3):"3"
  (x:1):"10"
  (x:number):number | "3" | "10";
};

type W = (A & B & C)|(A & C & B)|(B & A & C)|(B & C & A)|(C & A & B)|(C & B & A);

/*
* Scenario:
* (1) Overloads: Usng fully expanded domain support for C & B & A, so that all errors are detected at compile time
* (2) Implementation:
*     - Note extra lines added to make the function signature compatible with the implementation
* Disadvatage: More verbosity in number of overloads and in implementation.
* Number of overloads could impact compile time, and makes life harder for downstream users of the function
*/
function foo2(x:1):"1";
function foo2(x:2):"20";
function foo2(x:number):number;
function foo2(x:2):"2"
function foo2(x:3):"30"
function foo2(x:number):number;
function foo2(x:3):"3"
function foo2(x:1):"10"
function foo2(x:number):number;
function foo2(x:number){
  if (x===1) return "1";
  if (x===2) return "2";
  if (x===3) return "3";
  // (*) These nonsense unused extra lines need to be added to make the function signature compatible with the implementation
  if (x===1) return "10";
  if (x===2) return "20";
  if (x===3) return "30";
  return x;
}

foo2 satisfies A & B & C; // should satisfy
foo2 satisfies A & C & B; // should satisfy
foo2 satisfies B & A & C; // should satisfy
foo2 satisfies B & C & A; // should satisfy
foo2 satisfies C & A & B; // should satisfy
foo2 satisfies C & B & A; // should satisfy
foo2 satisfies W; // should satisfy


/*
* Scenario: Select some overloads from the orignal set of overloads.
* Advantages:
*     - Less verbosity in number of overloads
*     - Less verbosity in implementation
* Number of overloads could impact compile time, and makes life harder for downstream users of the function
*/
function foo1(x:1):"1";
function foo1(x:2):"2";
function foo1(x:3):"3";
function foo1(x:number):number;
function foo1(x:number){
  if (x===1) return "1";
  if (x===2) return "2";
  if (x===3) return "3";
  return x;
}

// The `&`-intersection operator result should be independent of the order of it's operands.
foo1 satisfies A & B & C; // should not error
foo1 satisfies A & C & B; // should not error
foo1 satisfies B & A & C; // should not error
foo1 satisfies B & C & A; // should not error
foo1 satisfies C & A & B; // should not error
foo1 satisfies C & B & A; // should not error
foo1 satisfies W; // should not error

/*
*/

//function foo3(x:1):"1"; //  Omitted domain support should cause satisfies error
function foo3(x:2):"2";
function foo3(x:3):"3";
function foo3(x:number):number;
function foo3(x:number): number | "1" | "2" | "3"{
  //if (x===1) return "1";
  if (x===2) return "2";
  if (x===3) return "3";
  return x;
  // In this case, a final throw "unexpected error" would never be reached anyway.
  // if (typeof x === "number") return x; // pointless
  // throw "unexpected error";
}

foo3 satisfies A & B & C; // should be error
foo3 satisfies A & C & B; // should be error
foo3 satisfies B & A & C; // should be error
foo3 satisfies B & C & A; // should be error
foo3 satisfies C & A & B; // should be error
foo3 satisfies C & B & A; // should be error


foo3 satisfies W; // should be error


}


/**********************/
// @filename:-57087-105.ts

namespace ns3 {
type A = { a: string };
type B = { b: 1 };
type C = { c: number };


interface X1 {
    f(x:A):string
    f(x:B):1
    g(f: X1["f"],arg:A|B):()=>ReturnType<X1["f"]>
}
interface X2 {
    f(x:C):number
    f(x:B):"1";
    g(f: X2["f"],arg:C|B):()=>ReturnType<X2["f"]>
}

declare const x1: X1;
declare const arg1: A|B;
x1.g(x1.f,arg1); // should be no error
declare const x2: X2;
declare const arg2: C|B;
x2.g(x2.f,arg2); // should be no error
const x = Math.random() < 0.5 ? x1 : x2;
x.g;
const arg = Math.random() < 0.5 ? arg1 : arg2;



type ArgCastType = (A & C) | (A & B) | (B & C);


function ftw(x:A):string;
function ftw(x:C):number;
function ftw(x:B):1;
function ftw(x: A|B|C) {
    if ("a" in x) return x.a;
    if ("c" in x) return x.c;
    return 1;
}

// The necessity of the argument cast is a separate issue!
x.g(ftw,arg as any as any as ArgCastType); // should not be error

function ftx(x:A):string;
function ftx(x:C):number;
function ftx(x:B):string; // should cause x.g(ft2) to error
function ftx(x: A|B|C) {
    if ("a" in x) return x.a;
    if ("c" in x) return x.c;
    return x.b;
}

// The necessity of the argument cast is a separate issue!
x.g(ftx,arg as any as any as ArgCastType); // should be error

//function fty(x:A):string;  // should cause x.g(ft2) to error
function fty(x:C):number;
function fty(x:B):1;
function fty(x: {a?: string, c?: number, b?: 1|"1"}) {
    if (x.a) return x.a;
    if (x.c) return x.c;
    if (x.b) return x.b;
    throw "unexpected error"
}

// The necessity of the argument cast is a separate issue!
x.g(fty,arg as any as any as ArgCastType); // should be error

function ftz(x:{a?:string}):string;  // should cause x.g(ft2) to error
function ftz(x:C):number;
function ftz(x:B):1;
function ftz(x: {a?: string, c?: number, b?: 1|"1"}) {
    if (x.a) return x.a;
    if (x.c) return x.c;
    if (x.b) return x.b;
    throw "unexpected error"
}

// The necessity of the argument cast is a separate issue!
x.g(ftz,arg as any as any as ArgCastType); // should be error

}


/**********************/
// @filename:-57087-131.ts

namespace ns4 {
interface Garg31A {
    (): "01";
    (x:1, y:1): "211"
};
declare const g31A: Garg31A;

interface Garg31B {
    (): "02";
    (x:2, y:2): "222";
    (x:2, y:1): "221"
};
declare const g31B: Garg31B;

declare const f31a: {
    (): "01";
    (x: 1, y: 1): "211";
    (x: 2, y: 2): "222";
    (x: 2, y: 1): "221";
};
f31a satisfies Garg31A & Garg31B; // should satisfy

declare const f31b: {
    (): "01";
    (x: 1, y: 1): "211";
    (x: 2, y: 2): "221" /*should cause "f31b satisfies" to error */;
    (x: 2, y: 1): "221";
};
f31b satisfies Garg31A & Garg31B; // should not satisfy

declare const f31c: {
    (): "01"; (x: 1, y: 1): "211";
    (x: 2, y: 2): "222";
    (x: 2, y: 1): "221";
    (x: 1, y: 2): "221" /*should cause "f31c satisfies" to error */;
};
f31c satisfies Garg31A & Garg31B; // should not satisfy

declare const f31d:{
    (): "01";
    (x?: 1, y?: 1): "211"; /*should cause "f31d satisfies" to error */
    (x: 2, y: 2): "222";
    (x: 2, y: 1): "221";
};
f31d satisfies Garg31A & Garg31B; // should not satisfy

declare const f31f: {
    //(): "01"; // missing domain support cannot be detected at compiler time with final never
    (x: 1, y: 1): "211";
    (x: 2, y: 2): "222";
    (x: 2, y: 1): "221";
}
f31f satisfies Garg31A & Garg31B; // should not satisfy



}


/**********************/
// @filename:-57087-133.ts

namespace ns5 {
interface Garg33A {
    (): "01";
    (x:1, y?:1): "111";
    (...args: [...1[]]): "101";
};
interface Garg33B {
    (): "02";
    (x:1, y?:1): "211";
    (...args:1[]): "201";
    (x:2, y?:any): "221"
};

declare const f33a: {
    (): "02";
    (x:1, y?:1): "211";
    (...args:1[]): "201";
    (x:2, y?:any): "221"
}
f33b satisfies Garg33A & Garg33B; // should  satisfy
// because (...args: [...1[]]):=>"101"  === (...args:1[]) => "201";


declare const f33b: {
    (): "02";
    (x:1, y?:1): "211";
    (...args: [...1[]]): "101";
    (...args:1[]): "201";
    (x:2, y?:any): "221"
}
f33b satisfies Garg33A & Garg33B; // should satisfy

declare const f33c: {
    (x:2, y?:any): "221"
    (...args:1[]): "201";
    (...args: [...1[]]): "101";
    (x:1, y?:1): "211";
    (): "02";
}
f33c satisfies Garg33A & Garg33B; // should satisfy (even though reversed order of overloads)



}


/**********************/
// @filename:-57087-135.ts

namespace ns6 {
interface Garg35A {
    ({x,y}:{x?:1, y?:Garg35B}): "A1"
    ({x,y}:{x?:2, y?:Garg35C}): "A2"
};
interface Garg35B {
    ({x,y}:{x?:2, y?:Garg35C}): "B1"
    ({x,y}:{x:2, y?:Garg35A}): "B2";
};
interface Garg35C {
    ({x,y}:{x:2, y?:Garg35A}): "C1";
    ({x,y}:{x?:1, y?:Garg35B}): "C2"
};

declare const f35a: {
    ({x,y}:{x?:1, y?:Garg35B}): "A1"
    ({x,y}:{x:2, y?:Garg35A}): "B2";
    ({x,y}:{x?:2, y?:Garg35C}): "A2"
}
f35a satisfies Garg35A & Garg35B & Garg35C; // should satisfy

declare const f35b: {
    ({x,y}:{x:2, y?:Garg35A}): "C1";
    ({x,y}:{x?:1, y?:Garg35B}): "C2"
    ({x,y}:{x?:2, y?:Garg35C}): "B1"
}
f35b satisfies typeof f35a & Garg35A & Garg35B & Garg35C; // should satisfy


}