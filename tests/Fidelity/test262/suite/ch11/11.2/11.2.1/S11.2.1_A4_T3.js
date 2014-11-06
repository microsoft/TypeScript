// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check type of various properties
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A4_T3.js
 * @description Checking properties of the Function object
 */

//CHECK#1-8
if (typeof Function.prototype  !== "function")  $ERROR('#1: typeof Function.prototype === "function". Actual: ' + (typeof Function.prototype ));
if (typeof Function['prototype']  !== "function")  $ERROR('#2: typeof Function["prototype"] === "function". Actual: ' + (typeof Function["prototype"] ));
if (typeof Function.prototype.toString  !== "function")  $ERROR('#3: typeof Function.prototype.toString === "function". Actual: ' + (typeof Function.prototype.toString ));
if (typeof Function.prototype['toString']  !== "function")  $ERROR('#4: typeof Function.prototype["toString"] === "function". Actual: ' + (typeof Function.prototype["toString"] ));
if (typeof Function.prototype.length !== "number")  $ERROR('#5: typeof Function.prototype.length === "number". Actual: ' + (typeof Function.prototype.length ));
if (typeof Function.prototype['length'] !== "number")  $ERROR('#6: typeof Function.prototype["length"] === "number". Actual: ' + (typeof Function.prototype["length"] ));
if (typeof Function.prototype.valueOf  !== "function")  $ERROR('#7: typeof Function.prototype.valueOf === "function". Actual: ' + (typeof Function.prototype.valueOf ));
if (typeof Function.prototype['valueOf']  !== "function")  $ERROR('#8: typeof Function.prototype["valueOf"] === "function". Actual: ' + (typeof Function.prototype["valueOf"] ));

