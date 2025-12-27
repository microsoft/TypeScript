// @target: es5,es2015,esnext
// @sourcemap: true

// Property names

// @filename: propertyNameWithEscape1.ts
export const foo = {\u0078: 10};
foo.x++;

// @filename: propertyNameWithEscape2.ts
export const foo = {x\u0078: 10};
foo.xx++;

// @filename: propertyNameWithEscape3.ts
export const foo = {a\u0062c\u0064e: 10};
foo.abcde++;

// @filename: propertyNameWithExtendedEscape1.ts
export const foo = {\u{78}: 10};
foo.x++;

// @filename: propertyNameWithExtendedEscape2.ts
export const foo = {x\u{78}: 10};
foo.xx++;

// @filename: propertyNameWithExtendedEscape3.ts
export const foo = {a\u{62}c\u{64}e: 10};
foo.abcde++;

// Shorthand property names

// @filename: shorthandPropertyNameWithEscape1.ts
export let \u0078 = 10;
export const foo = {\u0078};
foo.x++;

// @filename: shorthandPropertyNameWithEscape2.ts
export let x\u0078 = 10;
export const foo = {x\u0078};
foo.xx++;

// @filename: shorthandPropertyNameWithEscape3.ts
export let a\u0062c\u0064e = 10;
export const foo = {a\u0062c\u0064e};
foo.abcde++;

// @filename: shorthandPropertyNameWithExtendedEscape1.ts
export let \u{78} = 10;
export const foo = {\u{78}};
foo.x++;

// @filename: shorthandPropertyNameWithExtendedEscape2.ts
export let x\u{78} = 10;
export const foo = {x\u{78}};
foo.xx++;

// @filename: shorthandPropertyNameWithExtendedEscape3.ts
export let a\u{62}c\u{64}e = 10;
export const foo = {a\u{62}c\u{64}e};
foo.abcde++;

// Type variables

// @filename: typeVariableWithEscape1.ts
export type \u0078 = 10;
declare const foo: x;

// @filename: typeVariableWithEscape2.ts
export type x\u0078 = 10;
declare const foo: xx;

// @filename: typeVariableWithEscape3.ts
export type a\u0062c\u0064e = 10;
declare const foo: abcde;

// @filename: typeVariableWithExtendedEscape1.ts
export type \u{78} = 10;
declare const foo: x;

// @filename: typeVariableWithExtendedEscape2.ts
export type x\u{78} = 10;
declare const foo: xx;

// @filename: typeVariableWithExtendedEscape3.ts
export type a\u{62}c\u{64}e = 10;
declare const foo: abcde;
