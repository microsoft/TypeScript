// @strict: true
// @noEmit: true

// repro from #48840

declare let foo: (...args: never) => void;
foo(); // error
