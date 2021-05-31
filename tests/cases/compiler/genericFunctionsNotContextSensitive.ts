// @strict: true

// Repro from #37110

const f = <F extends (...args: any[]) => <G>(x: G) => void>(_: F): F => _;

const a = f(<K extends string>(_: K) => _ => ({}));  // <K extends string>(_: K) => <G>(_: G) => {}
