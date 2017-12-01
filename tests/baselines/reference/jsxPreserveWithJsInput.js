//// [tests/cases/compiler/jsxPreserveWithJsInput.ts] ////

//// [a.js]
var elemA = 42;

//// [b.jsx]
var elemB = <b>{"test"}</b>;

//// [c.js]
var elemC = <c>{42}</c>;

//// [d.ts]
var elemD = 42;

//// [e.tsx]
var elemE = <e>{true}</e>;


//// [a.js]
var elemA = 42;
//// [b.jsx]
var elemB = <b>{"test"}</b>;
//// [c.js]
var elemC = <c>{42}</c>;
//// [d.js]
var elemD = 42;
//// [e.jsx]
var elemE = <e>{true}</e>;
