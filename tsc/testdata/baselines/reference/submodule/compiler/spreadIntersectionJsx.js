//// [tests/cases/compiler/spreadIntersectionJsx.tsx] ////

//// [spreadIntersectionJsx.tsx]
const React: any = null;
class A { a; }
class C { c; }
let intersected: A & C;
let element = <div { ...intersected } />;


//// [spreadIntersectionJsx.js]
const React = null;
class A {
    a;
}
class C {
    c;
}
let intersected;
let element = <div {...intersected}/>;
