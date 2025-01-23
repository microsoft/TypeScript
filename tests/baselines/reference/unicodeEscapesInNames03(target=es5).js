//// [tests/cases/compiler/unicodeEscapesInNames03.ts] ////

//// [propertyNameWithEscape1.ts]
export const foo = {\u0078: 10};
foo.x++;

//// [propertyNameWithEscape2.ts]
export const foo = {x\u0078: 10};
foo.xx++;

//// [propertyNameWithEscape3.ts]
export const foo = {a\u0062c\u0064e: 10};
foo.abcde++;

//// [propertyNameWithExtendedEscape1.ts]
export const foo = {\u{78}: 10};
foo.x++;

//// [propertyNameWithExtendedEscape2.ts]
export const foo = {x\u{78}: 10};
foo.xx++;

//// [propertyNameWithExtendedEscape3.ts]
export const foo = {a\u{62}c\u{64}e: 10};
foo.abcde++;

// Shorthand property names

//// [shorthandPropertyNameWithEscape1.ts]
export let \u0078 = 10;
export const foo = {\u0078};
foo.x++;

//// [shorthandPropertyNameWithEscape2.ts]
export let x\u0078 = 10;
export const foo = {x\u0078};
foo.xx++;

//// [shorthandPropertyNameWithEscape3.ts]
export let a\u0062c\u0064e = 10;
export const foo = {a\u0062c\u0064e};
foo.abcde++;

//// [shorthandPropertyNameWithExtendedEscape1.ts]
export let \u{78} = 10;
export const foo = {\u{78}};
foo.x++;

//// [shorthandPropertyNameWithExtendedEscape2.ts]
export let x\u{78} = 10;
export const foo = {x\u{78}};
foo.xx++;

//// [shorthandPropertyNameWithExtendedEscape3.ts]
export let a\u{62}c\u{64}e = 10;
export const foo = {a\u{62}c\u{64}e};
foo.abcde++;

// Type variables

//// [typeVariableWithEscape1.ts]
export type \u0078 = 10;
declare const foo: x;

//// [typeVariableWithEscape2.ts]
export type x\u0078 = 10;
declare const foo: xx;

//// [typeVariableWithEscape3.ts]
export type a\u0062c\u0064e = 10;
declare const foo: abcde;

//// [typeVariableWithExtendedEscape1.ts]
export type \u{78} = 10;
declare const foo: x;

//// [typeVariableWithExtendedEscape2.ts]
export type x\u{78} = 10;
declare const foo: xx;

//// [typeVariableWithExtendedEscape3.ts]
export type a\u{62}c\u{64}e = 10;
declare const foo: abcde;


//// [propertyNameWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { \u0078: 10 };
exports.foo.x++;
//# sourceMappingURL=propertyNameWithEscape1.js.map
//// [propertyNameWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { x\u0078: 10 };
exports.foo.xx++;
//# sourceMappingURL=propertyNameWithEscape2.js.map
//// [propertyNameWithEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { a\u0062c\u0064e: 10 };
exports.foo.abcde++;
//# sourceMappingURL=propertyNameWithEscape3.js.map
//// [propertyNameWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { x: 10 };
exports.foo.x++;
//# sourceMappingURL=propertyNameWithExtendedEscape1.js.map
//// [propertyNameWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { xx: 10 };
exports.foo.xx++;
//# sourceMappingURL=propertyNameWithExtendedEscape2.js.map
//// [propertyNameWithExtendedEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { abcde: 10 };
exports.foo.abcde++;
// Shorthand property names
//# sourceMappingURL=propertyNameWithExtendedEscape3.js.map
//// [shorthandPropertyNameWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.x = void 0;
exports.\u0078 = 10;
exports.foo = { \u0078: exports.x };
exports.foo.x++;
//# sourceMappingURL=shorthandPropertyNameWithEscape1.js.map
//// [shorthandPropertyNameWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.xx = void 0;
exports.x\u0078 = 10;
exports.foo = { x\u0078: exports.xx };
exports.foo.xx++;
//# sourceMappingURL=shorthandPropertyNameWithEscape2.js.map
//// [shorthandPropertyNameWithEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.abcde = void 0;
exports.a\u0062c\u0064e = 10;
exports.foo = { a\u0062c\u0064e: exports.abcde };
exports.foo.abcde++;
//# sourceMappingURL=shorthandPropertyNameWithEscape3.js.map
//// [shorthandPropertyNameWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.x = void 0;
exports.x = 10;
exports.foo = { \u{78}: exports.x };
exports.foo.x++;
//# sourceMappingURL=shorthandPropertyNameWithExtendedEscape1.js.map
//// [shorthandPropertyNameWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.xx = void 0;
exports.xx = 10;
exports.foo = { x\u{78}: exports.xx };
exports.foo.xx++;
//# sourceMappingURL=shorthandPropertyNameWithExtendedEscape2.js.map
//// [shorthandPropertyNameWithExtendedEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.abcde = void 0;
exports.abcde = 10;
exports.foo = { a\u{62}c\u{64}e: exports.abcde };
exports.foo.abcde++;
// Type variables
//# sourceMappingURL=shorthandPropertyNameWithExtendedEscape3.js.map
//// [typeVariableWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=typeVariableWithEscape1.js.map
//// [typeVariableWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=typeVariableWithEscape2.js.map
//// [typeVariableWithEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=typeVariableWithEscape3.js.map
//// [typeVariableWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=typeVariableWithExtendedEscape1.js.map
//// [typeVariableWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=typeVariableWithExtendedEscape2.js.map
//// [typeVariableWithExtendedEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=typeVariableWithExtendedEscape3.js.map