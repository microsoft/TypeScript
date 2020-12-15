//// [genericFunctionsNotContextSensitive.ts]
// Repro from #37110

const f = <F extends (...args: any[]) => <G>(x: G) => void>(_: F): F => _;

const a = f(<K extends string>(_: K) => _ => ({}));  // <K extends string>(_: K) => <G>(_: G) => {}


//// [genericFunctionsNotContextSensitive.js]
"use strict";
// Repro from #37110
var f = function (_) { return _; };
var a = f(function (_) { return function (_) { return ({}); }; }); // <K extends string>(_: K) => <G>(_: G) => {}
