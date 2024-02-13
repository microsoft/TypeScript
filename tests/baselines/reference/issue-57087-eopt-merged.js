//// [tests/cases/compiler/issue-57087-eopt-merged.ts] ////

//// [-57087-01.ts]
/**********************/

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

function ft2(x:1|2):1|2;
function ft2(x:3):"2"|"3";
//function ft2(x:1|2|3):1|2|"2"|"3";
function ft2(x:1|2|3):1|2|"2"|"3" {
    if (x!==3) return x1.f(x);
    else return x2.f(x);
}
x.g(ft2); // error
}


/**********************/
//// [-57087-02.ts]
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

function ft3(x:1):1|2;
function ft3(x:3):"2"|"3";
function ft3(x:2):1|2|"2"|"3";
//function ft3(x:1|2|3):1|2|"2"|"3";
function ft3(x:1|2|3):1|2|"2"|"3"{
    if (x===1) return x1.f(x);
    if (x===3) return x2.f(x);
    return Math.random() < 0.5 ? x1.f(x) : x2.f(x);
}
x.g(ft3); // error
}


/**********************/
//// [-57087-03.ts]
namespace ns2 {
interface A9<T> {
    t: T;
    f():T;
    g(f: ()=>T):T[];
};

declare const a9: A9<string> | A9<number>;

// declare const f9: A9<string>["f"] & A9<number>["f"];
// a9.g(f9); // NO ERROR when argument is defined as an intersection of functions type

const f91 = ()=>Math.random() < 0.5 ? Math.random().toString() : Math.random();
//f91 satisfies A9<string>["f"] & A9<number>["f"] // but is not a valid implementation of either.

a9.g(f91); // INCORRECT ERROR;  argument is as an actual valid implementation, should not be error.

}


/**********************/
//// [-57087-04.ts]
namespace ns3 {
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

  function foo(x:1):"1";
  function foo(x:2):"2";
  function foo(x:3):"3";
  function foo(x:number):number|"1"|"2"|"3";
  function foo(x:number):number|"1"|"2"|"3"{
    if (x==1||x==2||x==3) return String(x) as any;
    return x;
  }

  // The `&`-intersection operator result should be independent of the order of it's operands.
  foo satisfies A & B & C;
  foo satisfies A & C & B;
  foo satisfies B & A & C;
  foo satisfies B & C & A;
  foo satisfies C & A & B;
  foo satisfies C & B & A;

  type W = (A & B & C)|(A & C & B)|(B & A & C)|(B & C & A)|(C & A & B)|(C & B & A);
  declare const w:W;
  w(1);// "1","10"
  w(2);// "2","20"
  w(3);// "3","30"

  foo(1); // "1"
  foo(2); // "2"
  foo(3); // "3"

  foo satisfies W;
}


/**********************/
//// [-57087-11.ts]
namespace ns4 {
declare const f: { (x: 1 | 2): 1 | 2; (x: 3): "2" | "3"; }

type Garg = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f satisfies Garg;
}


/**********************/
//// [-57087-12.ts]
namespace ns5 {
declare const f: { (x: 1): 1 | 2; (x: 3): "2" | "3"; (x: 2): 1 | 2 | "2" | "3"; }

type Garg = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f satisfies Garg;
}


/**********************/
//// [-57087-13.ts]
namespace ns6 {
declare const f42: () => string | number;
f42 satisfies (() => string) & (() => number);

}


/**********************/
//// [-57087-14.ts]
namespace ns7 {
declare const foo: { (x: 1): "1"; (x: 2): "2"; (x: 3): "3"; (x: number): number | "1" | "2" | "3"; }

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


foo satisfies A & B & C;
foo satisfies A & C & B;
foo satisfies B & A & C;
foo satisfies B & C & A;
foo satisfies C & A & B;
foo satisfies C & B & A;

type W = (A & B & C)|(A & C & B)|(B & A & C)|(B & C & A)|(C & A & B)|(C & B & A);

foo satisfies W;
}


/**********************/
//// [-57087-15.ts]
namespace ns8 {
declare const foo: { (x: 1): "1"; (x: 2): "2"; (x: 3): "3"; (x: number): number; }

interface C {
    (x:1):"1";
    (x:2):"20";
    (x:number):number;
    //(x:number):"1"|"20"|number;
};
interface B {
    (x:2):"2"
    (x:3):"30"
    (x:number):number;
    //(x:2|3|number):"2"|"30"|number;
};
interface A {
    (x:3):"3"
    (x:1):"10"
    (x:number):number;
    //(x:1|3|number):"3"|"10"|number;
};


foo satisfies A & B & C;
foo satisfies A & C & B;
foo satisfies B & A & C;
foo satisfies B & C & A;
foo satisfies C & A & B;
foo satisfies C & B & A;

type W = (A & B & C)|(A & C & B)|(B & A & C)|(B & C & A)|(C & A & B)|(C & B & A);

foo satisfies W;
}


/**********************/
//// [-57087-21.ts]
namespace ns9 {
// test f domain does not support Garg domain (3 omitted from f domain) - cannot detect during satisfies but can detect during call to f1

declare const f1: { (x: 1 | 2): 1 | 2; (x: 2): "2" | "3";}

type Garg1 = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f1 satisfies Garg1; // no error expected

f1(3); // error exptected - No overload matches this call. (ts2769)
// ~

}


/**********************/
//// [-57087-22.ts]
namespace ns10 {
// test f range exceeds Garg range - should not satisfy

declare const f2: { (x: 1 | 2): 0 |1 | 2; (x: 3): "2" | "3"; }

type Garg2 = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f2 satisfies Garg2; // should not satisfy

}


/**********************/
//// [-57087-31.ts]
namespace ns11 {
interface Garg31A {
    (): "01";
    (x:1, y:1): "211"
};
interface Garg31B {
    (): "02";
    (x:2, y:2): "222";
    (x:2, y:1): "221"
};

declare const f31a: { (): "01"; (x: 1, y: 1): "211"; (x: 2, y: 2): "222"; (x: 2, y: 1): "221"; }
f31a satisfies Garg31A & Garg31B; // should satisfy

declare const f31b: { (): "01"; (x: 1, y: 1): "211"; (x: 2, y: 2): "221" /*should fail match*/; (x: 2, y: 1): "221"; }
f31b satisfies Garg31A & Garg31B; // should not satisfy

declare const f31c: { (): "01"; (x: 1, y: 1): "211"; (x: 2, y: 2): "222"; (x: 2, y: 1): "221"; (x: 1, y: 2): "221" /*should fail match*/; }
f31c satisfies Garg31A & Garg31B; // should not satisfy

declare const f31d: { (): "01"; (x?: 1, y?: 1): "211"; (x: 2, y: 2): "222"; (x: 2, y: 1): "221"; }
f31d satisfies Garg31A & Garg31B; // should not satisfy

}


/**********************/
//// [-57087-33.ts]
namespace ns12 {
interface Garg33A {
    (): "01";
    (x?:1, y?:1): "211"
};
interface Garg33B {
    (): "02";
    (x?:2, y?:2): "222";
    (x?:2, y?:1): "221"
};


declare const f33b: { (): "01"; (x: 1, y: 1): "211"; (x: 2, y: 2): "221" /*should fail match*/; (x: 2, y: 1): "221"; }
f33b satisfies Garg33A & Garg33B; // should not satisfy

declare const f33c: { (): "01"; (x: 1, y: 1): "211"; (x: 2, y: 2): "222"; (x: 2, y: 1): "221"; (x: 1, y: 2): "221" /*should fail match*/; }
f33c satisfies Garg33A & Garg33B; // should not satisfy


declare const f33a: { (): "01"; (x: 1, y: 1): "211"; (x: 2, y: 2): "222"; (x: 2, y: 1): "221"; }
f33a satisfies Garg33A & Garg33B; // should satisfy

declare const f33d: { (): "01"; (x?: 1, y?: 1): "211"; (x: 2, y: 2): "222"; (x: 2, y: 1): "221"; }
f33d satisfies Garg33A & Garg33B; // should satisfy

declare const f33e: { (): "01"; (x?: 1, y?: 1): "211"; (x?: 2, y?: 2): "222"; (x: 2, y: 1): "221"; }
f33e satisfies Garg33A & Garg33B; // should satisfy

}


/**********************/
//// [-57087-35.ts]
namespace ns13 {
interface Garg35A {
    ({x,y}:{x:1, y:1}): "111"
};
interface Garg35B {
    ({x,y}:{x?:2, y?:1}): "221"
    ({x,y}:{x:2, y?:2}): "222";
};

declare const f35a: { ({x,y}:{x:1, y:1}): "111"; ({x,y}:{x?:2, y?:1}): "221"; ({x,y}:{x:2, y?:2}): "222"; }
f35a satisfies Garg35A & Garg35B; // should satisfy

declare const f35b: { ({x,y}:{x:1, y:1}): "111"; ({x,y}:{x?:2, y?:1}): "221"; ({x,y}:{x:2, y:2}): "222"; }
f35b satisfies Garg35A & Garg35B; // should satisfy

declare const f35c: { ({x,y}:{x:1, y:1}): "111"; (arg:Record<string,never>): "221"; ({x}:{x:2}): "221"; ({y}:{y:1}): "221"; ({x,y}:{x:2, y:1}): "221"; ({x,y}:{x:2, y:2}): "222"; }
f35c satisfies Garg35A & Garg35B; // should satisfy

const t1 = f35c({}); // no error, return 221

declare const f35d: { ({x,y}:{x:1, y:1}): "111"; (arg:Record<string,never>): "221"; /*({x}:{x:2}): "221";*/ ({y}:{y:1}): "221"; ({x,y}:{x:2, y:1}): "221"; ({x,y}:{x:2, y:2}): "222"; }
f35d satisfies Garg35A & Garg35B; // should satisfy

const t2 = f35d({x:2}); // error expected - no overload matches this call
//              ~~~~~

}


/**********************/
//// [-57087-36.ts]
namespace ns14 {
interface Garg36A {
    ({x,y}:{x:1, y:1}): "111"
};
interface Garg36B {
    ({x,y}:{x?:2, y?:1}): "221"
    ({x,y}:{x:2, y?:2}): "222";
};


declare const f36d: { ({x,y}:{x:1, y:1}): "111"; ({x,y}:{x:2, y:1}): "221"; ({x,y}:{x:2, y:2}): "222"; }
f36d satisfies Garg36A & Garg36B; // should satisfy

}


/**********************/
//// [-57087-37.ts]
namespace ns15 {
interface Garg37A {
    ({x,y}:{x:1, y:1}): "111"
};
interface Garg37B {
    ({x,y}:{x?:2, y?:1}): "221"
    ({x,y}:{x:2, y?:2}): "222";
};


declare const f37d: { ({x,y}:{x:1, y:1}): "111"; (): "221"; ({x}:{x:2}): "221"; ({y}:{y:1}): "221"; ({x,y}:{x:2, y:1}): "221"; ({x,y}:{x:2, y:2}): "222"; }
f37d satisfies Garg37A & Garg37B; // should satisfy

f37d({}); // error expected - no overload matches this call

}


/**********************/
//// [-57087-callsOnComplexSignatures-01.ts]
namespace ns16 {
function test3(items: string[] | number[]) {
    items.forEach(item => console.log(item)); // must not be error
//                   ~~~~~~~~~~~~~~~~~~~~~~~~~
// !!! error TS2345: Argument of type '(item: string | number) => void' is not assignable to parameter of type '((value: string, index: number, array: string[]) => void) & ((value: number, index: number, array: number[]) => void)'.
}
}


/**********************/
//// [-57087-callsOnComplexSignatures-02.ts]
namespace ns17 {
type MyArray<T> = {
    [n: number]: T;
    forEach(callbackfn: (value: T, index: number, array: MyArray<T>) => unknown): void;
};



function test3(items: MyArray<string> | MyArray<number>) {
    items.forEach(item => console.log(item));
}
}


/**********************/
//// [-57087-contextualOverloadListFromArrayUnion-01.ts]
namespace ns18 {
declare const y1: number[][] | string[];
export const yThen1 = y1.map(item => item.length);

}


/**********************/
//// [-57087-contextualOverloadListFromArrayUnion-02.ts]
namespace ns19 {
declare const y2: number[][] | string[];
declare function f2<T extends {length:number}>(x: T): number;
export const yThen2 = y2.map(f2);

}


/**********************/
//// [-57087-contextualOverloadListFromArrayUnion-03.ts]
namespace ns20 {
declare const y3: number[][] | string[];
declare function f3<T extends {length:number}>(): (x: T) => number;
export const yThen3 = y3.map(f3); // should be an error, but is not

}


/**********************/
//// [-57087-contextualOverloadListFromArrayUnion-04.ts]
namespace ns21 {
declare const y4: number[][] | string[];
declare function f4<T extends {length:number}>(): (x: T) => number;
export const yThen4 = y4.map(f4()); // should not be an error, but is an error

}


/**********************/
//// [-57087-contextualOverloadListFromArrayUnion-05.ts]
namespace ns22 {
declare const y5: number[][] | string[];
declare const f5: { (x: number[]): number; (x: string): number;}
export const yThen4 = y5.map(f5);

}


/**********************/
//// [-57087-contextualOverloadListFromArrayUnion-10.ts]
namespace ns23 {
declare const y1: number[][] | string[];
export const yThen1 = y1.map(item => item.length);

declare function f12<T extends {length:number}>(x: T): number;
export const yThen2 = y1.map(f12);

export const yThen2a = y1.map(<T extends {length:number}>(x:T)=>x.length);

declare function f14<T extends {length:number}>(): (x: T) => unknown;
export const yThen4 = y1.map(f14()); // should not be an error

export const yThen4a = y1.map(<T extends {length:number}>()=>(x: T) => x.length);

declare const f15: { (x: number[]): number; (x: string): number;}
export const yThen5 = y1.map(f15);




}


/**********************/
//// [-57087-toSorted-01.ts]
namespace ns24 {
// interface Arr<T> {
//     toSorted(compareFn?: (a: T, b: T) => number): T[];
// }

// declare const arr: Arr<number> | Arr<string>;/workspaces/ts+dt/-test


const f = (compareFn?: ((
    a: { id: number; description: null; } | { id: number; description: string; },
    b: { id: number; description: null; } | { id: number; description: string; }) => number) | undefined) => {
    return 0 as any as ({ id: number; description: null; } | { id: number; description: string; })[]
};


type F1 =  (compareFn?: ((a: { id: number; }, b: { id: number; }) => number) | undefined) =>
            { id: number; }[] & { id: number; description: string | null; }[];

type F2 = (compareFn?: ((a: { id: number; description: string | null; }, b: { id: number; description: string | null; }) => number) | undefined) =>
            { id: number; }[]& { id: number; description: string | null; }[]
type F = F1 & F2;

f satisfies F;
}


/**********************/
//// [-57087-toSorted-02.ts]
namespace ns25 {
const a = 0 as any as ({ id: number; description: null; } | { id: number; description: string; })[];
type A = { id: number; }[] & { id: number; description: string | null; }[];
a satisfies A;


}


/**********************/
//// [-57087-unionOfClassCalls-01.ts]
namespace ns26 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.map((a: number | string, index: number) => {
        return index
    });
}

}


/**********************/
//// [-57087-unionOfClassCalls-02.ts]
namespace ns27 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const t = arr.reduce((acc: Array<string>, a: number | string, index: number) => {
        return []
    }, [])

}

}


/**********************/
//// [-57087-unionOfClassCalls-03.ts]
namespace ns28 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.forEach((a: number | string, index: number) => {
        return index
    });
}

}


/**********************/
//// [-57087-unionOfClassCalls-11.ts]
namespace ns29 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.map((a, index) => {
        return index
    });
}

}


/**********************/
//// [-57087-unionOfClassCalls-12.ts]
namespace ns30 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const t = arr.reduce((acc, a, index) => {
        return []
    }, [])

}

}


/**********************/
//// [-57087-unionOfClassCalls-13.ts]
namespace ns31 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.forEach((a, index) => {
        return index
    });
}

}


/**********************/
//// [-57087-unionOfClassCalls-21.ts]
namespace ns32 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.map(a=>a);
}

}


/**********************/
//// [-57087-unionOfClassCalls-22.ts]
namespace ns33 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const t = arr.reduce((acc,a) => acc+a)
}

}


/**********************/
//// [-57087-unionOfClassCalls-23.ts]
namespace ns34 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.forEach(a => {
        // do something
    });
}

}

//// [-57087-01.js]
"use strict";
/**********************/
var ns0;
(function (ns0) {
    x1.g(x1.f); // no error
    x2.g(x2.f); // no error
    var x = Math.random() < 0.5 ? x1 : x2;
    x.g; // (method) FMap<T, R>.g(f: ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3")): 1 | 2 | "2" | "3"
    //function ft2(x:1|2|3):1|2|"2"|"3";
    function ft2(x) {
        if (x !== 3)
            return x1.f(x);
        else
            return x2.f(x);
    }
    x.g(ft2); // error
})(ns0 || (ns0 = {}));
/**********************/ 
//// [-57087-02.js]
"use strict";
var ns1;
(function (ns1) {
    x1.g(x1.f); // no error
    x2.g(x2.f); // no error
    var x = Math.random() < 0.5 ? x1 : x2;
    x.g; // (method) FMap<T, R>.g(f: ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3")): 1 | 2 | "2" | "3"
    //function ft3(x:1|2|3):1|2|"2"|"3";
    function ft3(x) {
        if (x === 1)
            return x1.f(x);
        if (x === 3)
            return x2.f(x);
        return Math.random() < 0.5 ? x1.f(x) : x2.f(x);
    }
    x.g(ft3); // error
})(ns1 || (ns1 = {}));
/**********************/ 
//// [-57087-03.js]
"use strict";
var ns2;
(function (ns2) {
    ;
    // declare const f9: A9<string>["f"] & A9<number>["f"];
    // a9.g(f9); // NO ERROR when argument is defined as an intersection of functions type
    var f91 = function () { return Math.random() < 0.5 ? Math.random().toString() : Math.random(); };
    //f91 satisfies A9<string>["f"] & A9<number>["f"] // but is not a valid implementation of either.
    a9.g(f91); // INCORRECT ERROR;  argument is as an actual valid implementation, should not be error.
})(ns2 || (ns2 = {}));
/**********************/ 
//// [-57087-04.js]
"use strict";
var ns3;
(function (ns3) {
    ;
    ;
    ;
    function foo(x) {
        if (x == 1 || x == 2 || x == 3)
            return String(x);
        return x;
    }
    // The `&`-intersection operator result should be independent of the order of it's operands.
    foo;
    foo;
    foo;
    foo;
    foo;
    foo;
    w(1); // "1","10"
    w(2); // "2","20"
    w(3); // "3","30"
    foo(1); // "1"
    foo(2); // "2"
    foo(3); // "3"
    foo;
})(ns3 || (ns3 = {}));
/**********************/ 
//// [-57087-11.js]
"use strict";
var ns4;
(function (ns4) {
    f;
})(ns4 || (ns4 = {}));
/**********************/ 
//// [-57087-12.js]
"use strict";
var ns5;
(function (ns5) {
    f;
})(ns5 || (ns5 = {}));
/**********************/ 
//// [-57087-13.js]
"use strict";
var ns6;
(function (ns6) {
    f42;
})(ns6 || (ns6 = {}));
/**********************/ 
//// [-57087-14.js]
"use strict";
var ns7;
(function (ns7) {
    ;
    ;
    ;
    foo;
    foo;
    foo;
    foo;
    foo;
    foo;
    foo;
})(ns7 || (ns7 = {}));
/**********************/ 
//// [-57087-15.js]
"use strict";
var ns8;
(function (ns8) {
    ;
    ;
    ;
    foo;
    foo;
    foo;
    foo;
    foo;
    foo;
    foo;
})(ns8 || (ns8 = {}));
/**********************/ 
//// [-57087-21.js]
"use strict";
var ns9;
(function (ns9) {
    // test f domain does not support Garg domain (3 omitted from f domain) - cannot detect during satisfies but can detect during call to f1
    f1; // no error expected
    f1(3); // error exptected - No overload matches this call. (ts2769)
    // ~
})(ns9 || (ns9 = {}));
/**********************/ 
//// [-57087-22.js]
"use strict";
var ns10;
(function (ns10) {
    // test f range exceeds Garg range - should not satisfy
    f2; // should not satisfy
})(ns10 || (ns10 = {}));
/**********************/ 
//// [-57087-31.js]
"use strict";
var ns11;
(function (ns11) {
    ;
    ;
    f31a; // should satisfy
    f31b; // should not satisfy
    f31c; // should not satisfy
    f31d; // should not satisfy
})(ns11 || (ns11 = {}));
/**********************/ 
//// [-57087-33.js]
"use strict";
var ns12;
(function (ns12) {
    ;
    ;
    f33b; // should not satisfy
    f33c; // should not satisfy
    f33a; // should satisfy
    f33d; // should satisfy
    f33e; // should satisfy
})(ns12 || (ns12 = {}));
/**********************/ 
//// [-57087-35.js]
"use strict";
var ns13;
(function (ns13) {
    ;
    ;
    f35a; // should satisfy
    f35b; // should satisfy
    f35c; // should satisfy
    var t1 = f35c({}); // no error, return 221
    f35d; // should satisfy
    var t2 = f35d({ x: 2 }); // error expected - no overload matches this call
    //              ~~~~~
})(ns13 || (ns13 = {}));
/**********************/ 
//// [-57087-36.js]
"use strict";
var ns14;
(function (ns14) {
    ;
    ;
    f36d; // should satisfy
})(ns14 || (ns14 = {}));
/**********************/ 
//// [-57087-37.js]
"use strict";
var ns15;
(function (ns15) {
    ;
    ;
    f37d; // should satisfy
    f37d({}); // error expected - no overload matches this call
})(ns15 || (ns15 = {}));
/**********************/ 
//// [-57087-callsOnComplexSignatures-01.js]
"use strict";
var ns16;
(function (ns16) {
    function test3(items) {
        items.forEach(function (item) { return console.log(item); }); // must not be error
        //                   ~~~~~~~~~~~~~~~~~~~~~~~~~
        // !!! error TS2345: Argument of type '(item: string | number) => void' is not assignable to parameter of type '((value: string, index: number, array: string[]) => void) & ((value: number, index: number, array: number[]) => void)'.
    }
})(ns16 || (ns16 = {}));
/**********************/ 
//// [-57087-callsOnComplexSignatures-02.js]
"use strict";
var ns17;
(function (ns17) {
    function test3(items) {
        items.forEach(function (item) { return console.log(item); });
    }
})(ns17 || (ns17 = {}));
/**********************/ 
//// [-57087-contextualOverloadListFromArrayUnion-01.js]
"use strict";
var ns18;
(function (ns18) {
    ns18.yThen1 = y1.map(function (item) { return item.length; });
})(ns18 || (ns18 = {}));
/**********************/ 
//// [-57087-contextualOverloadListFromArrayUnion-02.js]
"use strict";
var ns19;
(function (ns19) {
    ns19.yThen2 = y2.map(f2);
})(ns19 || (ns19 = {}));
/**********************/ 
//// [-57087-contextualOverloadListFromArrayUnion-03.js]
"use strict";
var ns20;
(function (ns20) {
    ns20.yThen3 = y3.map(f3); // should be an error, but is not
})(ns20 || (ns20 = {}));
/**********************/ 
//// [-57087-contextualOverloadListFromArrayUnion-04.js]
"use strict";
var ns21;
(function (ns21) {
    ns21.yThen4 = y4.map(f4()); // should not be an error, but is an error
})(ns21 || (ns21 = {}));
/**********************/ 
//// [-57087-contextualOverloadListFromArrayUnion-05.js]
"use strict";
var ns22;
(function (ns22) {
    ns22.yThen4 = y5.map(f5);
})(ns22 || (ns22 = {}));
/**********************/ 
//// [-57087-contextualOverloadListFromArrayUnion-10.js]
"use strict";
var ns23;
(function (ns23) {
    ns23.yThen1 = y1.map(function (item) { return item.length; });
    ns23.yThen2 = y1.map(f12);
    ns23.yThen2a = y1.map(function (x) { return x.length; });
    ns23.yThen4 = y1.map(f14()); // should not be an error
    ns23.yThen4a = y1.map(function () { return function (x) { return x.length; }; });
    ns23.yThen5 = y1.map(f15);
})(ns23 || (ns23 = {}));
/**********************/ 
//// [-57087-toSorted-01.js]
"use strict";
var ns24;
(function (ns24) {
    // interface Arr<T> {
    //     toSorted(compareFn?: (a: T, b: T) => number): T[];
    // }
    // declare const arr: Arr<number> | Arr<string>;/workspaces/ts+dt/-test
    var f = function (compareFn) {
        return 0;
    };
    f;
})(ns24 || (ns24 = {}));
/**********************/ 
//// [-57087-toSorted-02.js]
"use strict";
var ns25;
(function (ns25) {
    var a = 0;
    a;
})(ns25 || (ns25 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-01.js]
"use strict";
var ns26;
(function (ns26) {
    {
        var arr = []; // Works with Array<number | string>
        var arr1 = [];
        var arr2 = [];
        var t = arr.map(function (a, index) {
            return index;
        });
    }
})(ns26 || (ns26 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-02.js]
"use strict";
var ns27;
(function (ns27) {
    {
        var arr = []; // Works with Array<number | string>
        var t = arr.reduce(function (acc, a, index) {
            return [];
        }, []);
    }
})(ns27 || (ns27 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-03.js]
"use strict";
var ns28;
(function (ns28) {
    {
        var arr = []; // Works with Array<number | string>
        var arr1 = [];
        var arr2 = [];
        var t = arr.forEach(function (a, index) {
            return index;
        });
    }
})(ns28 || (ns28 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-11.js]
"use strict";
var ns29;
(function (ns29) {
    {
        var arr = []; // Works with Array<number | string>
        var arr1 = [];
        var arr2 = [];
        var t = arr.map(function (a, index) {
            return index;
        });
    }
})(ns29 || (ns29 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-12.js]
"use strict";
var ns30;
(function (ns30) {
    {
        var arr = []; // Works with Array<number | string>
        var t = arr.reduce(function (acc, a, index) {
            return [];
        }, []);
    }
})(ns30 || (ns30 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-13.js]
"use strict";
var ns31;
(function (ns31) {
    {
        var arr = []; // Works with Array<number | string>
        var arr1 = [];
        var arr2 = [];
        var t = arr.forEach(function (a, index) {
            return index;
        });
    }
})(ns31 || (ns31 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-21.js]
"use strict";
var ns32;
(function (ns32) {
    {
        var arr = []; // Works with Array<number | string>
        var arr1 = [];
        var arr2 = [];
        var t = arr.map(function (a) { return a; });
    }
})(ns32 || (ns32 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-22.js]
"use strict";
var ns33;
(function (ns33) {
    {
        var arr = []; // Works with Array<number | string>
        var t = arr.reduce(function (acc, a) { return acc + a; });
    }
})(ns33 || (ns33 = {}));
/**********************/ 
//// [-57087-unionOfClassCalls-23.js]
"use strict";
var ns34;
(function (ns34) {
    {
        var arr = []; // Works with Array<number | string>
        var arr1 = [];
        var arr2 = [];
        var t = arr.forEach(function (a) {
            // do something
        });
    }
})(ns34 || (ns34 = {}));
