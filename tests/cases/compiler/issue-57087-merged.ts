// @strict: true


/**********************/
// @filename:-57087-01.ts

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
// @filename:-57087-02.ts

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
// @filename:-57087-03.ts

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
// @filename:-57087-04.ts

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
// @filename:-57087-11.ts

namespace ns4 {
declare const f: { (x: 1 | 2): 1 | 2; (x: 3): "2" | "3"; }

type Garg = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f satisfies Garg;
}


/**********************/
// @filename:-57087-12.ts

namespace ns5 {
declare const f: { (x: 1): 1 | 2; (x: 3): "2" | "3"; (x: 2): 1 | 2 | "2" | "3"; }

type Garg = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f satisfies Garg;
}


/**********************/
// @filename:-57087-13.ts

namespace ns6 {
declare const f42: () => string | number;
f42 satisfies (() => string) & (() => number);

}


/**********************/
// @filename:-57087-14.ts

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
// @filename:-57087-15.ts

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
// @filename:-57087-21.ts

namespace ns9 {
// test f domain does not support Garg domain (3 omitted from f domain) - cannot detect during satisfies but can detect during call to f1

declare const f1: { (x: 1 | 2): 1 | 2; (x: 2): "2" | "3";}

type Garg1 = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f1 satisfies Garg1; // no error expected

f1(3); // error exptected - No overload matches this call. (ts2769)
// ~

}


/**********************/
// @filename:-57087-22.ts

namespace ns10 {
// test f range exceeds Garg range - should not satisfy

declare const f2: { (x: 1 | 2): 0 |1 | 2; (x: 3): "2" | "3"; }

type Garg2 = ((x: 1 | 2) => 1 | 2) & ((x: 2 | 3) => "2" | "3");

f2 satisfies Garg2; // should not satisfy

}


/**********************/
// @filename:-57087-31.ts

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
// @filename:-57087-33.ts

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
// @filename:-57087-35.ts

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
// @filename:-57087-36.ts

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
// @filename:-57087-37.ts

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
// @filename:-57087-callsOnComplexSignatures-01.ts

namespace ns16 {
function test3(items: string[] | number[]) {
    items.forEach(item => console.log(item)); // must not be error
//                   ~~~~~~~~~~~~~~~~~~~~~~~~~
// !!! error TS2345: Argument of type '(item: string | number) => void' is not assignable to parameter of type '((value: string, index: number, array: string[]) => void) & ((value: number, index: number, array: number[]) => void)'.
}
}


/**********************/
// @filename:-57087-callsOnComplexSignatures-02.ts

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
// @filename:-57087-contextualOverloadListFromArrayUnion-01.ts

namespace ns18 {
declare const y1: number[][] | string[];
export const yThen1 = y1.map(item => item.length);

}


/**********************/
// @filename:-57087-contextualOverloadListFromArrayUnion-02.ts

namespace ns19 {
declare const y2: number[][] | string[];
declare function f2<T extends {length:number}>(x: T): number;
export const yThen2 = y2.map(f2);

}


/**********************/
// @filename:-57087-contextualOverloadListFromArrayUnion-03.ts

namespace ns20 {
declare const y3: number[][] | string[];
declare function f3<T extends {length:number}>(): (x: T) => number;
export const yThen3 = y3.map(f3); // should be an error, but is not

}


/**********************/
// @filename:-57087-contextualOverloadListFromArrayUnion-04.ts

namespace ns21 {
declare const y4: number[][] | string[];
declare function f4<T extends {length:number}>(): (x: T) => number;
export const yThen4 = y4.map(f4()); // should not be an error, but is an error

}


/**********************/
// @filename:-57087-contextualOverloadListFromArrayUnion-05.ts

namespace ns22 {
declare const y5: number[][] | string[];
declare const f5: { (x: number[]): number; (x: string): number;}
export const yThen4 = y5.map(f5);

}


/**********************/
// @filename:-57087-contextualOverloadListFromArrayUnion-10.ts

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
// @filename:-57087-toSorted-01.ts

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
// @filename:-57087-toSorted-02.ts

namespace ns25 {
const a = 0 as any as ({ id: number; description: null; } | { id: number; description: string; })[];
type A = { id: number; }[] & { id: number; description: string | null; }[];
a satisfies A;


}


/**********************/
// @filename:-57087-unionOfClassCalls-01.ts

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
// @filename:-57087-unionOfClassCalls-02.ts

namespace ns27 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const t = arr.reduce((acc: Array<string>, a: number | string, index: number) => {
        return []
    }, [])

}

}


/**********************/
// @filename:-57087-unionOfClassCalls-03.ts

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
// @filename:-57087-unionOfClassCalls-11.ts

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
// @filename:-57087-unionOfClassCalls-12.ts

namespace ns30 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const t = arr.reduce((acc, a, index) => {
        return []
    }, [])

}

}


/**********************/
// @filename:-57087-unionOfClassCalls-13.ts

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
// @filename:-57087-unionOfClassCalls-21.ts

namespace ns32 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const arr1: number[]  = [];
    const arr2:  string[] = [];
    const t = arr.map(a=>a);
}

}


/**********************/
// @filename:-57087-unionOfClassCalls-22.ts

namespace ns33 {
{
    const arr: number[] | string[] = [];  // Works with Array<number | string>
    const t = arr.reduce((acc,a) => acc+a)
}

}


/**********************/
// @filename:-57087-unionOfClassCalls-23.ts

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