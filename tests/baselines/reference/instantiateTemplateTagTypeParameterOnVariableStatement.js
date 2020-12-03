//// [instantiateTemplateTagTypeParameterOnVariableStatement.js]
/**
 * @template T
 * @param {T} a
 * @returns {(b: T) => T}
 */
const seq = a => b => b;

const text1 = "hello";
const text2 = "world";

/** @type {string} */
var text3 = seq(text1)(text2);




//// [instantiateTemplateTagTypeParameterOnVariableStatement.d.ts]
/**
 * @template T
 * @param {T} a
 * @returns {(b: T) => T}
 */
declare function seq<T>(a: T): (b: T) => T;
declare const text1: "hello";
declare const text2: "world";
/** @type {string} */
declare var text3: string;
