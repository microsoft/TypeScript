// @target: esnext
// @module: esnext
// @allowJs: true
// @noEmit: true
// @filename: global.js

/** @type {*} */
var dec;

// @filename: file1.js

// ok
@dec export class C1 { }

// @filename: file2.js

// ok
@dec export default class C2 {}

// @filename: file3.js

// error
export @dec default class C3 {}

// @filename: file4.js

// ok
export @dec class C4 {}

// @filename: file5.js

// ok
export default @dec class C5 {}

// @filename: file6.js

// error
@dec export @dec class C6 {}

// @filename: file7.js

// error
@dec export default @dec class C7 {}
