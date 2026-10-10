//// [tests/cases/compiler/parseGenericArrowRatherThanLeftShift2.tsx] ////

//// [heritage.ts]
declare const f: <T>(x: T) => T;
declare function g(): typeof B;
declare class B<F> {}
interface I<F> {}
interface J<F> {}

class C1 implements I<<T>(x: T) => T> {}
class C2 extends B<<T>(x: T) => T> {}
const C3 = class extends g()<<T>(x: T) => T> {};
interface I2 extends J<<T>(x: T) => T> {}
type A1 = typeof f<<T>(x: T) => T>;

const e1 = f<<T>(x: T) => T>;
const e2 = f<<T>(x: T) => T>(f);

// `<<` is still a left shift in expressions.
declare let n: number;
const s1 = n << 2;
const s2 = n<<n;
const s3 = (n<<n) > n;

// `<<` after a type query in an expression is still a left shift.
declare const a: any;
const s4 = a as typeof n << 1;
const s5 = a satisfies typeof n << 1;

//// [jsx.tsx]
declare namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: { x?: number };
    }
}
declare function Comp<P>(props: { value: P }): JSX.Element;

const j1 = <Comp<<T>(x: T) => T> value={f} />;
const j2 = <Comp<<T>(x: T) => T> value={f}></Comp>;
const j3 = <div x={n << 1} />;
const j4 = <div x={n<<n} />;


//// [heritage.js]
"use strict";
class C1 {
}
 << T > (x);
T;
T > {};
class C2 extends B {
}
 << T > (x);
T;
T > {};
const C3 = class extends g() {
} << T > (x), T;
T > {};
 << T > (x);
T;
T > {};
;
const e1 = f;
const e2 = f(f);
const s1 = n << 2;
const s2 = n << n;
const s3 = (n << n) > n;
const s4 = a << 1;
const s5 = a << 1;
//// [jsx.jsx]
"use strict";
const j1 = <Comp /> << T > (x), T;
T > value;
{
    f;
}
/>;
const j2 = <Comp /> << T > (x), T;
T > value;
{
    f;
}
 > ;
Comp > ;
const j3 = <div x={n << 1}/>;
const j4 = <div x={n << n}/>;
