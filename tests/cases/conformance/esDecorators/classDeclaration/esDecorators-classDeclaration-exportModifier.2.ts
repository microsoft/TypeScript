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

// @filename: file6.ts

// error
@dec export @dec class C6 {}

// @filename: file7.ts

// error
@dec export default @dec class C7 {}

// @filename: file8.ts

// ok
@dec abstract class C8 {}

// @filename: file9.ts

// ok
@dec export abstract class C9 {}

// @filename: file10.ts

// ok
@dec export default abstract class C10 {}

// @filename: file11.ts

// ok
export @dec abstract class C11 {}

// @filename: file12.ts

// ok
export default @dec abstract class C12 {}

// @filename: file13.ts

// error
abstract @dec class C13 {}

// @filename: file14.ts

// error
export abstract @dec class C14 {}

// @filename: file15.ts

// error
export default abstract @dec class C15 {}
