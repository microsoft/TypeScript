//// [ts-ignore-start-ts-ignore-end.ts]
export const texts: string[] = [];

// @ts-ignore-start
texts.push(1);
texts.push(2);
texts.push(3);
// @ts-ignore-end

// @ts-ignore-start some comment on start
texts.push(4);
// @ts-ignore-end some comment on end


/**
  @ts-ignore-start */
texts.push(4);
texts.push(5);
texts.push(6);
/** @ts-ignore-end */

// @ts-ignore-start single line comment
texts.push(7);
/* @ts-ignore-end  multiline comment */

// error
texts.push(8);

// @ts-ignore-end that was not started
texts.push(9);


//// [ts-ignore-start-ts-ignore-end.js]
"use strict";
exports.__esModule = true;
exports.texts = void 0;
exports.texts = [];
// @ts-ignore-start
exports.texts.push(1);
exports.texts.push(2);
exports.texts.push(3);
// @ts-ignore-end
// @ts-ignore-start some comment on start
exports.texts.push(4);
// @ts-ignore-end some comment on end
/**
  @ts-ignore-start */
exports.texts.push(4);
exports.texts.push(5);
exports.texts.push(6);
/** @ts-ignore-end */
// @ts-ignore-start single line comment
exports.texts.push(7);
/* @ts-ignore-end  multiline comment */
// error
exports.texts.push(8);
// @ts-ignore-end that was not started
exports.texts.push(9);
