// @target: es3

const normalNumber = 123; // should not error
let bigintType: bigint; // should not error
let bigintLiteralType: 123n; // should not error when used as type
let bigintNegativeLiteralType: -123n; // should not error when used as type
const bigintNumber = 123n * 0b1111n + 0o444n * 0x7fn; // each literal should error
