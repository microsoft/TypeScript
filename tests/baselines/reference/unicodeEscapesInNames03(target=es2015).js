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
export const foo = { \u0078: 10 };
foo.x++;
//# sourceMappingURL=propertyNameWithEscape1.js.map
//// [propertyNameWithEscape2.js]
export const foo = { x\u0078: 10 };
foo.xx++;
//# sourceMappingURL=propertyNameWithEscape2.js.map
//// [propertyNameWithEscape3.js]
export const foo = { a\u0062c\u0064e: 10 };
foo.abcde++;
//# sourceMappingURL=propertyNameWithEscape3.js.map
//// [propertyNameWithExtendedEscape1.js]
export const foo = { \u{78}: 10 };
foo.x++;
//# sourceMappingURL=propertyNameWithExtendedEscape1.js.map
//// [propertyNameWithExtendedEscape2.js]
export const foo = { x\u{78}: 10 };
foo.xx++;
//# sourceMappingURL=propertyNameWithExtendedEscape2.js.map
//// [propertyNameWithExtendedEscape3.js]
export const foo = { a\u{62}c\u{64}e: 10 };
foo.abcde++;
// Shorthand property names
//# sourceMappingURL=propertyNameWithExtendedEscape3.js.map
//// [shorthandPropertyNameWithEscape1.js]
export let \u0078 = 10;
export const foo = { \u0078 };
foo.x++;
//# sourceMappingURL=shorthandPropertyNameWithEscape1.js.map
//// [shorthandPropertyNameWithEscape2.js]
export let x\u0078 = 10;
export const foo = { x\u0078 };
foo.xx++;
//# sourceMappingURL=shorthandPropertyNameWithEscape2.js.map
//// [shorthandPropertyNameWithEscape3.js]
export let a\u0062c\u0064e = 10;
export const foo = { a\u0062c\u0064e };
foo.abcde++;
//# sourceMappingURL=shorthandPropertyNameWithEscape3.js.map
//// [shorthandPropertyNameWithExtendedEscape1.js]
export let \u{78} = 10;
export const foo = { \u{78} };
foo.x++;
//# sourceMappingURL=shorthandPropertyNameWithExtendedEscape1.js.map
//// [shorthandPropertyNameWithExtendedEscape2.js]
export let x\u{78} = 10;
export const foo = { x\u{78} };
foo.xx++;
//# sourceMappingURL=shorthandPropertyNameWithExtendedEscape2.js.map
//// [shorthandPropertyNameWithExtendedEscape3.js]
export let a\u{62}c\u{64}e = 10;
export const foo = { a\u{62}c\u{64}e };
foo.abcde++;
// Type variables
//# sourceMappingURL=shorthandPropertyNameWithExtendedEscape3.js.map
//// [typeVariableWithEscape1.js]
export {};
//# sourceMappingURL=typeVariableWithEscape1.js.map
//// [typeVariableWithEscape2.js]
export {};
//# sourceMappingURL=typeVariableWithEscape2.js.map
//// [typeVariableWithEscape3.js]
export {};
//# sourceMappingURL=typeVariableWithEscape3.js.map
//// [typeVariableWithExtendedEscape1.js]
export {};
//# sourceMappingURL=typeVariableWithExtendedEscape1.js.map
//// [typeVariableWithExtendedEscape2.js]
export {};
//# sourceMappingURL=typeVariableWithExtendedEscape2.js.map
//// [typeVariableWithExtendedEscape3.js]
export {};
//# sourceMappingURL=typeVariableWithExtendedEscape3.js.map