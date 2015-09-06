// @out: file.js
// @module: commonjs
// @filename: mod2.ts
export default class D {
}

// @filename: file1.ts
import C from "mod";
import D from "mod2";
class B extends C { // no error here
}
class A extends D { // no error here
}

// @filename: mod.ts
export default class C {
}
