// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: types.d.ts
type Foo = () => void;

// @filename: a.js
/** @type {Foo} */
const f1 = function test() {};

/** @type {Foo} */
const f2 = function () {};

/** @type {Foo} */
const f3 = () => {};

/** @type {Foo} */
function f4 () {};
