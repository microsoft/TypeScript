//// [tests/cases/conformance/jsx/jsxParsingError3.tsx] ////

//// [file.tsx]
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}

//// [Error1.tsx]
let x1 = <div>}</div>;

//// [Error2.tsx]
let x2 = <div>></div>;

//// [Error3.tsx]
let x3 = <div>{"foo"}}</div>;

//// [Error4.tsx]
let x4 = <div>{"foo"}></div>;

//// [Error5.tsx]
let x5 = <div>}{"foo"}</div>;

//// [Error6.tsx]
let x6 = <div>>{"foo"}</div>;


//// [file.jsx]
//// [Error1.jsx]
var x1 = <div>}</div>;
//// [Error2.jsx]
var x2 = <div>></div>;
//// [Error3.jsx]
var x3 = <div>{"foo"}}</div>;
//// [Error4.jsx]
var x4 = <div>{"foo"}></div>;
//// [Error5.jsx]
var x5 = <div>}{"foo"}</div>;
//// [Error6.jsx]
var x6 = <div>>{"foo"}</div>;
