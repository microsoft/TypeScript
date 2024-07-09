// @target: esnext
const y = { a: 'yes', b: 'no' };
const o = { x: 1, ...y };
var b;
var rest: any;
({ b, ...rest } = o);
