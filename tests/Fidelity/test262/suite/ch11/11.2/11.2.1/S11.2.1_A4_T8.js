// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check type of various properties
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A4_T8.js
 * @description Checking properties of the Math Object
 */

//CHECK#1-52
if (typeof Math.E !== "number")  $ERROR('#1: typeof Math.E === "number". Actual: ' + (typeof Math.E ));
if (typeof Math['E'] !== "number")  $ERROR('#2: typeof Math["E"] === "number". Actual: ' + (typeof Math["E"] ));
if (typeof Math.LN10 !== "number")  $ERROR('#3: typeof Math.LN10 === "number". Actual: ' + (typeof Math.LN10 ));
if (typeof Math['LN10'] !== "number")  $ERROR('#4: typeof Math["LN10"] === "number". Actual: ' + (typeof Math["LN10"] ));
if (typeof Math.LN2 !== "number")  $ERROR('#5: typeof Math.LN2 === "number". Actual: ' + (typeof Math.LN2 ));
if (typeof Math['LN2'] !== "number")  $ERROR('#6: typeof Math["LN2"] === "number". Actual: ' + (typeof Math["LN2"] ));
if (typeof Math.LOG2E !== "number")  $ERROR('#7: typeof Math.LOG2E === "number". Actual: ' + (typeof Math.LOG2E ));
if (typeof Math['LOG2E'] !== "number")  $ERROR('#8: typeof Math["LOG2E"] === "number". Actual: ' + (typeof Math["LOG2E"] ));
if (typeof Math.LOG10E !== "number")  $ERROR('#9: typeof Math.LOG10E === "number". Actual: ' + (typeof Math.LOG10E ));
if (typeof Math['LOG10E'] !== "number")  $ERROR('#10: typeof Math["LOG10E"] === "number". Actual: ' + (typeof Math["LOG10E"] ));
if (typeof Math.PI !== "number")  $ERROR('#11: typeof Math.PI === "number". Actual: ' + (typeof Math.PI ));
if (typeof Math['PI'] !== "number")  $ERROR('#12: typeof Math["PI"] === "number". Actual: ' + (typeof Math["PI"] ));
if (typeof Math.SQRT1_2 !== "number")  $ERROR('#13: typeof Math.SQRT1_2 === "number". Actual: ' + (typeof Math.SQRT1_2 ));
if (typeof Math['SQRT1_2'] !== "number")  $ERROR('#14: typeof Math["SQRT1_2"] === "number". Actual: ' + (typeof Math["SQRT1_2"] ));
if (typeof Math.SQRT2 !== "number")  $ERROR('#15: typeof Math.SQRT2 === "number". Actual: ' + (typeof Math.SQRT2 ));
if (typeof Math['SQRT2'] !== "number")  $ERROR('#16: typeof Math["SQRT2"] === "number". Actual: ' + (typeof Math["SQRT2"] ));
if (typeof Math.abs !== "function")  $ERROR('#17: typeof Math.abs === "function". Actual: ' + (typeof Math.abs ));
if (typeof Math['abs'] !== "function")  $ERROR('#18: typeof Math["abs"] === "function". Actual: ' + (typeof Math["abs"] ));
if (typeof Math.acos !== "function")  $ERROR('#19: typeof Math.acos === "function". Actual: ' + (typeof Math.acos ));
if (typeof Math['acos'] !== "function")  $ERROR('#20: typeof Math["acos"] === "function". Actual: ' + (typeof Math["acos"] ));
if (typeof Math.asin !== "function")  $ERROR('#21: typeof Math.asin === "function". Actual: ' + (typeof Math.asin ));
if (typeof Math['asin'] !== "function")  $ERROR('#22: typeof Math["asin"] === "function". Actual: ' + (typeof Math["asin"] ));
if (typeof Math.atan !== "function")  $ERROR('#23: typeof Math.atan === "function". Actual: ' + (typeof Math.atan ));
if (typeof Math['atan'] !== "function")  $ERROR('#24: typeof Math["atan"] === "function". Actual: ' + (typeof Math["atan"] ));
if (typeof Math.atan2 !== "function")  $ERROR('#25: typeof Math.atan2 === "function". Actual: ' + (typeof Math.atan2 ));
if (typeof Math['atan2'] !== "function")  $ERROR('#26: typeof Math["atan2"] === "function". Actual: ' + (typeof Math["atan2"] ));
if (typeof Math.ceil !== "function")  $ERROR('#27: typeof Math.ceil === "function". Actual: ' + (typeof Math.ceil ));
if (typeof Math['ceil'] !== "function")  $ERROR('#28: typeof Math["ceil"] === "function". Actual: ' + (typeof Math["ceil"] ));
if (typeof Math.cos !== "function")  $ERROR('#29: typeof Math.cos === "function". Actual: ' + (typeof Math.cos ));
if (typeof Math['cos'] !== "function")  $ERROR('#30: typeof Math["cos"] === "function". Actual: ' + (typeof Math["cos"] ));
if (typeof Math.exp !== "function")  $ERROR('#31: typeof Math.exp === "function". Actual: ' + (typeof Math.exp ));
if (typeof Math['exp'] !== "function")  $ERROR('#32: typeof Math["exp"] === "function". Actual: ' + (typeof Math["exp"] ));
if (typeof Math.floor !== "function")  $ERROR('#33: typeof Math.floor === "function". Actual: ' + (typeof Math.floor ));
if (typeof Math['floor'] !== "function")  $ERROR('#34: typeof Math["floor"] === "function". Actual: ' + (typeof Math["floor"] ));
if (typeof Math.log !== "function")  $ERROR('#35: typeof Math.log === "function". Actual: ' + (typeof Math.log ));
if (typeof Math['log'] !== "function")  $ERROR('#36: typeof Math["log"] === "function". Actual: ' + (typeof Math["log"] ));
if (typeof Math.max !== "function")  $ERROR('#37: typeof Math.max === "function". Actual: ' + (typeof Math.max ));
if (typeof Math['max'] !== "function")  $ERROR('#38: typeof Math["max"] === "function". Actual: ' + (typeof Math["max"] ));
if (typeof Math.min !== "function")  $ERROR('#39: typeof Math.min === "function". Actual: ' + (typeof Math.min ));
if (typeof Math['min'] !== "function")  $ERROR('#40: typeof Math["min"] === "function". Actual: ' + (typeof Math["min"] ));
if (typeof Math.pow !== "function")  $ERROR('#41: typeof Math.pow === "function". Actual: ' + (typeof Math.pow ));
if (typeof Math['pow'] !== "function")  $ERROR('#42: typeof Math["pow"] === "function". Actual: ' + (typeof Math["pow"] ));
if (typeof Math.random !== "function")  $ERROR('#43: typeof Math.random === "function". Actual: ' + (typeof Math.random ));
if (typeof Math['random'] !== "function")  $ERROR('#44: typeof Math["random"] === "function". Actual: ' + (typeof Math["random"] ));
if (typeof Math.round !== "function")  $ERROR('#45: typeof Math.round === "function". Actual: ' + (typeof Math.round ));
if (typeof Math['round'] !== "function")  $ERROR('#46: typeof Math["round"] === "function". Actual: ' + (typeof Math["round"] ));
if (typeof Math.sin !== "function")  $ERROR('#47: typeof Math.sin === "function". Actual: ' + (typeof Math.sin ));
if (typeof Math['sin'] !== "function")  $ERROR('#48: typeof Math["sin"] === "function". Actual: ' + (typeof Math["sin"] ));
if (typeof Math.sqrt !== "function")  $ERROR('#49: typeof Math.sqrt === "function". Actual: ' + (typeof Math.sqrt ));
if (typeof Math['sqrt'] !== "function")  $ERROR('#50: typeof Math["sqrt"] === "function". Actual: ' + (typeof Math["sqrt"] ));
if (typeof Math.tan !== "function")  $ERROR('#51: typeof Math.tan === "function". Actual: ' + (typeof Math.tan ));
if (typeof Math['tan'] !== "function")  $ERROR('#52: typeof Math["tan"] === "function". Actual: ' + (typeof Math["tan"] ));


