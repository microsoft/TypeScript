// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check type of various properties
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A4_T5.js
 * @description Checking properties of the String object
 */

//CHECK#1-28
if (typeof String.prototype  !== "object")  $ERROR('#1: typeof String.prototype === "object". Actual: ' + (typeof String.prototype ));
if (typeof String['prototype']  !== "object")  $ERROR('#2: typeof String["prototype"] === "object". Actual: ' + (typeof String["prototype"] ));
if (typeof String.fromCharCode  !== "function")  $ERROR('#3: typeof String.fromCharCode === "function". Actual: ' + (typeof String.fromCharCode ));
if (typeof String['fromCharCode']  !== "function")  $ERROR('#4: typeof String["fromCharCode"] === "function". Actual: ' + (typeof String["fromCharCode"] ));
if (typeof String.prototype.toString  !== "function")  $ERROR('#5: typeof String.prototype.toString === "function". Actual: ' + (typeof String.prototype.toString ));
if (typeof String.prototype['toString']  !== "function")  $ERROR('#6: typeof String.prototype["toString"] === "function". Actual: ' + (typeof String.prototype["toString"] ));
if (typeof String.prototype.constructor  !== "function")  $ERROR('#7: typeof String.prototype.constructor === "function". Actual: ' + (typeof String.prototype.constructor ));
if (typeof String.prototype['constructor']  !== "function")  $ERROR('#8: typeof String.prototype["constructor"] === "function". Actual: ' + (typeof String.prototype["constructor"] ));
if (typeof String.prototype.valueOf  !== "function")  $ERROR('#9: typeof String.prototype.valueOf === "function". Actual: ' + (typeof String.prototype.valueOf ));
if (typeof String.prototype['valueOf']  !== "function")  $ERROR('#10: typeof String.prototype["valueOf"] === "function". Actual: ' + (typeof String.prototype["valueOf"] ));
if (typeof String.prototype.charAt !== "function")  $ERROR('#11: typeof String.prototype.charAt === "function". Actual: ' + (typeof String.prototype.charAt ));
if (typeof String.prototype['charAt'] !== "function")  $ERROR('#12: typeof String.prototype["charAt"] === "function". Actual: ' + (typeof String.prototype["charAt"] ));
if (typeof String.prototype.charCodeAt !== "function")  $ERROR('#13: typeof String.prototype.charCodeAt === "function". Actual: ' + (typeof String.prototype.charCodeAt ));
if (typeof String.prototype['charCodeAt'] !== "function")  $ERROR('#14: typeof String.prototype["charCodeAt"] === "function". Actual: ' + (typeof String.prototype["charCodeAt"] ));
if (typeof String.prototype.indexOf  !== "function")  $ERROR('#15: typeof String.prototype.indexOf === "function". Actual: ' + (typeof String.prototype.indexOf ));
if (typeof String.prototype['indexOf']  !== "function")  $ERROR('#16: typeof String.prototype["indexOf"] === "function". Actual: ' + (typeof String.prototype["indexOf"] ));
if (typeof String.prototype.lastIndexOf  !== "function")  $ERROR('#17: typeof String.prototype.lastIndexOf === "function". Actual: ' + (typeof String.prototype.lastIndexOf ));
if (typeof String.prototype['lastIndexOf']  !== "function")  $ERROR('#18: typeof String.prototype["lastIndexOf"] === "function". Actual: ' + (typeof String.prototype["lastIndexOf"] ));
if (typeof String.prototype.split !== "function")  $ERROR('#19: typeof String.prototype.split === "function". Actual: ' + (typeof String.prototype.split ));
if (typeof String.prototype['split'] !== "function")  $ERROR('#20: typeof String.prototype["split"] === "function". Actual: ' + (typeof String.prototype["split"] ));
if (typeof String.prototype.substring  !== "function")  $ERROR('#21: typeof String.prototype.substring === "function". Actual: ' + (typeof String.prototype.substring ));
if (typeof String.prototype['substring']  !== "function")  $ERROR('#22: typeof String.prototype["substring"] === "function". Actual: ' + (typeof String.prototype["substring"] ));
if (typeof String.prototype.toLowerCase !== "function")  $ERROR('#23: typeof String.prototype.toLowerCase === "function". Actual: ' + (typeof String.prototype.toLowerCase ));
if (typeof String.prototype['toLowerCase'] !== "function")  $ERROR('#24: typeof String.prototype["toLowerCase"] === "function". Actual: ' + (typeof String.prototype["toLowerCase"] ));
if (typeof String.prototype.toUpperCase !== "function")  $ERROR('#25: typeof String.prototype.toUpperCase === "function". Actual: ' + (typeof String.prototype.toUpperCase ));
if (typeof String.prototype['toUpperCase'] !== "function")  $ERROR('#26: typeof Array.prototype === "object". Actual: ' + (typeof Array.prototype ));
if (typeof String.prototype.length  !== "number")  $ERROR('#27: typeof String.prototype.length === "number". Actual: ' + (typeof String.prototype.length ));
if (typeof String.prototype['length']  !== "number")  $ERROR('#28: typeof String.prototype["length"] === "number". Actual: ' + (typeof String.prototype["length"] ));


