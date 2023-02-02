// @target: esnext
// @module: esnext
// @filename: global.ts

/** @type {*} */
var dec;

// @filename: file1.ts

// ok
@dec export class C1 { }

// @filename: file2.ts

// ok
@dec export default class C2 {}

// @filename: file3.ts

// error
export @dec default class C3 {}

// @filename: file4.ts

// ok
export @dec class C4 {}

// @filename: file5.ts

// ok
export default @dec class C5 {}
