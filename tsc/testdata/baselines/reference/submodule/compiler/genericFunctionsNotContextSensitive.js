//// [tests/cases/compiler/genericFunctionsNotContextSensitive.ts] ////

//// [genericFunctionsNotContextSensitive.ts]
// Repro from #37110

const f = <F extends (...args: any[]) => <G>(x: G) => void>(_: F): F => _;

const a = f(<K extends string>(_: K) => _ => ({}));  // <K extends string>(_: K) => <G>(_: G) => {}


//// [genericFunctionsNotContextSensitive.js]
// Repro from #37110
const f = (_) => _;
const a = f((_) => _ => ({})); // <K extends string>(_: K) => <G>(_: G) => {}
