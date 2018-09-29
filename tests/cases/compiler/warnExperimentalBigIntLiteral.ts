const normalNumber = 123; // should not error
const bigintNumber = 123n * 0b1111n + 0o444n * 0x7fn; // each literal should error