// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check type of various properties
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A4_T1.js
 * @description Checking properties of this object
 */

//CHECK#1-32
if (typeof (this.NaN)  === "undefined")  $ERROR('#1: typeof (this.NaN) !== "undefined"');
if (typeof this['NaN']  === "undefined")  $ERROR('#2: typeof this["NaN"] !== "undefined"');
if (typeof this.Infinity  === "undefined")  $ERROR('#3: typeof this.Infinity !== "undefined"');
if (typeof this['Infinity']  === "undefined")  $ERROR('#4: typeof this["Infinity"] !== "undefined"');
if (typeof this.parseInt  === "undefined")  $ERROR('#5: typeof this.parseInt !== "undefined"');
if (typeof this['parseInt'] === "undefined")  $ERROR('#6: typeof this["parseInt"] !== "undefined"');
if (typeof this.parseFloat  === "undefined")  $ERROR('#7: typeof this.parseFloat !== "undefined"');
if (typeof this['parseFloat'] === "undefined")  $ERROR('#8: typeof this["parseFloat"] !== "undefined"');
if (typeof this.escape  === "undefined")  $ERROR('#9: typeof this.escape !== "undefined"');
if (typeof this['escape'] === "undefined")  $ERROR('#10: typeof this["escape"] !== "undefined"');
if (typeof this.unescape  === "undefined")  $ERROR('#11: typeof this.unescape !== "undefined"');
if (typeof this['unescape'] === "undefined")  $ERROR('#12: typeof this["unescape"] !== "undefined"');
if (typeof this.isNaN  === "undefined")  $ERROR('#13: typeof this.isNaN !== "undefined"');
if (typeof this['isNaN'] === "undefined")  $ERROR('#14: typeof this["isNaN"] !== "undefined"');
if (typeof this.isFinite  === "undefined")  $ERROR('#15: typeof this.isFinite !== "undefined"');
if (typeof this['isFinite'] === "undefined")  $ERROR('#16: typeof this["isFinite"] !== "undefined"');
if (typeof this.Object === "undefined")  $ERROR('#17: typeof this.Object !== "undefined"');
if (typeof this['Object'] === "undefined")  $ERROR('#18: typeof this["Object"] !== "undefined"');
if (typeof this.Number === "undefined")  $ERROR('#19: typeof this.Number !== "undefined"');
if (typeof this['Number'] === "undefined")  $ERROR('#20: typeof this["Number"] !== "undefined"');
if (typeof this.Function === "undefined")  $ERROR('#21: typeof this.Function !== "undefined"');
if (typeof this['Function'] === "undefined")  $ERROR('#22: typeof this["Function"] !== "undefined"');
if (typeof this.Array === "undefined")  $ERROR('#23: typeof this.Array !== "undefined"');
if (typeof this['Array'] === "undefined")  $ERROR('#24: typeof this["Array"] !== "undefined"');
if (typeof this.String === "undefined")  $ERROR('#25: typeof this.String !== "undefined"');
if (typeof this['String'] === "undefined")  $ERROR('#26: typeof this["String"] !== "undefined"');
if (typeof this.Boolean === "undefined")  $ERROR('#27: typeof this.Boolean !== "undefined"');
if (typeof this['Boolean'] === "undefined")  $ERROR('#28: typeof this["Boolean"] !== "undefined"');
if (typeof this.Date === "undefined")  $ERROR('#29: typeof this.Date !== "undefined"');
if (typeof this['Date'] === "undefined")  $ERROR('#30: typeof this["Date"] !== "undefined"');
if (typeof this.Math === "undefined")  $ERROR('#31: typeof this.Math !== "undefined"');
if (typeof this['Math'] === "undefined")  $ERROR('#32: typeof this["Math"] !== "undefined"');

