// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check type of various properties
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A4_T9.js
 * @description Checking properties of the Date object
 */

//CHECK#1-86
if (typeof Date.parse !== "function")  $ERROR('#1: typeof Date.parse === "function". Actual: ' + (typeof Date.parse ));
if (typeof Date['parse'] !== "function")  $ERROR('#2: typeof Date["parse"] === "function". Actual: ' + (typeof Date["parse"] ));
if (typeof Date.prototype !== "object")  $ERROR('#3: typeof Date.prototype === "object". Actual: ' + (typeof Date.prototype ));
if (typeof Date['prototype'] !== "object")  $ERROR('#4: typeof Date["prototype"] === "object". Actual: ' + (typeof Date["prototype"] ));
if (typeof Date.UTC !== "function")  $ERROR('#5: typeof Date.UTC === "function". Actual: ' + (typeof Date.UTC ));
if (typeof Date['UTC'] !== "function")  $ERROR('#6: typeof Date["UTC"] === "function". Actual: ' + (typeof Date["UTC"] ));
if (typeof Date.prototype.constructor !== "function")  $ERROR('#7: typeof Date.prototype.constructor === "funvtion". Actual: ' + (typeof Date.prototype.constructor ));
if (typeof Date.prototype['constructor'] !== "function")  $ERROR('#8: typeof Date.prototype["constructor"] === "function". Actual: ' + (typeof Date.prototype["constructor"] ));
if (typeof Date.prototype.toString !== "function")  $ERROR('#9: typeof Date.prototype.toString === "function". Actual: ' + (typeof Date.prototype.toString ));
if (typeof Date.prototype['toString'] !== "function")  $ERROR('#10: typeof Date.prototype["toString"] === "function". Actual: ' + (typeof Date.prototype["toString"] ));
if (typeof Date.prototype.valueOf !== "function")  $ERROR('#11: typeof Date.prototype.valueOf === "function". Actual: ' + (typeof Date.prototype.valueOf ));
if (typeof Date.prototype['valueOf'] !== "function")  $ERROR('#12: typeof Date.prototype["valueOf"] === "function". Actual: ' + (typeof Date.prototype["valueOf"] ));
if (typeof Date.prototype.getTime !== "function")  $ERROR('#13: typeof Date.prototype.getTime === "function". Actual: ' + (typeof Date.prototype.getTime ));
if (typeof Date.prototype['getTime'] !== "function")  $ERROR('#14: typeof Date.prototype["getTime"] === "function". Actual: ' + (typeof Date.prototype["getTime"] ));
if (typeof Date.prototype.getYear !== "function")  $ERROR('#15: typeof Date.prototype.getYear === "function". Actual: ' + (typeof Date.prototype.getYear ));
if (typeof Date.prototype['getYear'] !== "function")  $ERROR('#16: typeof Date.prototype["getYear"] === "function". Actual: ' + (typeof Date.prototype["getYear"] ));
if (typeof Date.prototype.getFullYear !== "function")  $ERROR('#17: typeof Date.prototype.getFullYear === "function". Actual: ' + (typeof Date.prototype.getFullYear ));
if (typeof Date.prototype['getFullYear'] !== "function")  $ERROR('#18: typeof Date.prototype["getFullYear"] === "function". Actual: ' + (typeof Date.prototype["getFullYear"] ));
if (typeof Date.prototype.getUTCFullYear !== "function")  $ERROR('#19: typeof Date.prototype.getUTCFullYear === "function". Actual: ' + (typeof Date.prototype.getUTCFullYear ));
if (typeof Date.prototype['getUTCFullYear'] !== "function")  $ERROR('#20: typeof Date.prototype["getUTCFullYear"] === "function". Actual: ' + (typeof Date.prototype["getUTCFullYear"] ));
if (typeof Date.prototype.getMonth !== "function")  $ERROR('#21: typeof Date.prototype.getMonth === "function". Actual: ' + (typeof Date.prototype.getMonth ));
if (typeof Date.prototype['getMonth'] !== "function")  $ERROR('#22: typeof Date.prototype["getMonth"] === "function". Actual: ' + (typeof Date.prototype["getMonth"] ));
if (typeof Date.prototype.getUTCMonth !== "function")  $ERROR('#23: typeof Date.prototype.getUTCMonth === "function". Actual: ' + (typeof Date.prototype.getUTCMonth ));
if (typeof Date.prototype['getUTCMonth'] !== "function")  $ERROR('#24: typeof Date.prototype["getUTCMonth"] === "function". Actual: ' + (typeof Date.prototype["getUTCMonth"] ));
if (typeof Date.prototype.getDate !== "function")  $ERROR('#25: typeof Date.prototype.getDate === "function". Actual: ' + (typeof Date.prototype.getDate ));
if (typeof Date.prototype['getDate'] !== "function")  $ERROR('#26: typeof Date.prototype["getDate"] === "function". Actual: ' + (typeof Date.prototype["getDate"] ));
if (typeof Date.prototype.getUTCDate !== "function")  $ERROR('#27: typeof Date.prototype.getUTCDate === "function". Actual: ' + (typeof Date.prototype.getUTCDate ));
if (typeof Date.prototype['getUTCDate'] !== "function")  $ERROR('#28: typeof Date.prototype["getUTCDate"] === "function". Actual: ' + (typeof Date.prototype["getUTCDate"] ));
if (typeof Date.prototype.getDay !== "function")  $ERROR('#29: typeof Date.prototype.getDay === "function". Actual: ' + (typeof Date.prototype.getDay ));
if (typeof Date.prototype['getDay'] !== "function")  $ERROR('#30: typeof Date.prototype["getDay"] === "function". Actual: ' + (typeof Date.prototype["getDay"] ));
if (typeof Date.prototype.getUTCDay !== "function")  $ERROR('#31: typeof Date.prototype.getUTCDay === "function". Actual: ' + (typeof Date.prototype.getUTCDay ));
if (typeof Date.prototype['getUTCDay'] !== "function")  $ERROR('#32: typeof Date.prototype["getUTCDay"] === "function". Actual: ' + (typeof Date.prototype["getUTCDay"] ));
if (typeof Date.prototype.getHours !== "function")  $ERROR('#33: typeof Date.prototype.getHours === "function". Actual: ' + (typeof Date.prototype.getHours ));
if (typeof Date.prototype['getHours'] !== "function")  $ERROR('#34: typeof Date.prototype["getHours"] === "function". Actual: ' + (typeof Date.prototype["getHours"] ));
if (typeof Date.prototype.getUTCHours !== "function")  $ERROR('#35: typeof Date.prototype.getUTCHours === "function". Actual: ' + (typeof Date.prototype.getUTCHours ));
if (typeof Date.prototype['getUTCHours'] !== "function")  $ERROR('#36: typeof Date.prototype["getUTCHours"] === "function". Actual: ' + (typeof Date.prototype["getUTCHours"] ));
if (typeof Date.prototype.getMinutes !== "function")  $ERROR('#37: typeof Date.prototype.getMinutes === "function". Actual: ' + (typeof Date.prototype.getMinutes ));
if (typeof Date.prototype['getMinutes'] !== "function")  $ERROR('#38: typeof Date.prototype["getMinutes"] === "function". Actual: ' + (typeof Date.prototype["getMinutes"] ));
if (typeof Date.prototype.getUTCMinutes !== "function")  $ERROR('#39: typeof Date.prototype.getUTCMinutes === "function". Actual: ' + (typeof Date.prototype.getUTCMinutes ));
if (typeof Date.prototype['getUTCMinutes'] !== "function")  $ERROR('#40: typeof Date.prototype["getUTCMinutes"] === "function". Actual: ' + (typeof Date.prototype["getUTCMinutes"] ));
if (typeof Date.prototype.getSeconds !== "function")  $ERROR('#41: typeof Date.prototype.getSeconds === "function". Actual: ' + (typeof Date.prototype.getSeconds ));
if (typeof Date.prototype['getSeconds'] !== "function")  $ERROR('#42: typeof Date.prototype["getSeconds"] === "function". Actual: ' + (typeof Date.prototype["getSeconds"] ));
if (typeof Date.prototype.getUTCSeconds !== "function")  $ERROR('#43: typeof Date.prototype.getUTCSeconds === "function". Actual: ' + (typeof Date.prototype.getUTCSeconds ));
if (typeof Date.prototype['getUTCSeconds'] !== "function")  $ERROR('#44: typeof Date.prototype["getUTCSeconds"] === "function". Actual: ' + (typeof Date.prototype["getUTCSeconds"] ));
if (typeof Date.prototype.getMilliseconds !== "function")  $ERROR('#45: typeof Date.prototype.getMilliseconds === "function". Actual: ' + (typeof Date.prototype.getMilliseconds ));
if (typeof Date.prototype['getMilliseconds'] !== "function")  $ERROR('#46: typeof Date.prototype["getMilliseconds"] === "function". Actual: ' + (typeof Date.prototype["getMilliseconds"] ));
if (typeof Date.prototype.getUTCMilliseconds !== "function")  $ERROR('#47: typeof Date.prototype.getUTCMilliseconds === "function". Actual: ' + (typeof Date.prototype.getUTCMilliseconds ));
if (typeof Date.prototype['getUTCMilliseconds'] !== "function")  $ERROR('#48: typeof Date.prototype["getUTCMilliseconds"] === "function". Actual: ' + (typeof Date.prototype["getUTCMilliseconds"] ));
if (typeof Date.prototype.setTime !== "function")  $ERROR('#49: typeof Date.prototype.setTime === "function". Actual: ' + (typeof Date.prototype.setTime ));
if (typeof Date.prototype['setTime'] !== "function")  $ERROR('#50: typeof Date.prototype["setTime"] === "function". Actual: ' + (typeof Date.prototype["setTime"] ));
if (typeof Date.prototype.setMilliseconds !== "function")  $ERROR('#51: typeof Date.prototype.setMilliseconds === "function". Actual: ' + (typeof Date.prototype.setMilliseconds ));
if (typeof Date.prototype['setMilliseconds'] !== "function")  $ERROR('#52: typeof Date.prototype["setMilliseconds"] === "function". Actual: ' + (typeof Date.prototype["setMilliseconds"] ));
if (typeof Date.prototype.setUTCMilliseconds !== "function")  $ERROR('#53: typeof Date.prototype.setUTCMilliseconds === "function". Actual: ' + (typeof Date.prototype.setUTCMilliseconds ));
if (typeof Date.prototype['setUTCMilliseconds'] !== "function")  $ERROR('#54: typeof Date.prototype["setUTCMilliseconds"] === "function". Actual: ' + (typeof Date.prototype["setUTCMilliseconds"] ));
if (typeof Date.prototype.setSeconds !== "function")  $ERROR('#55: typeof Date.prototype.setSeconds === "function". Actual: ' + (typeof Date.prototype.setSeconds ));
if (typeof Date.prototype['setSeconds'] !== "function")  $ERROR('#56: typeof Date.prototype["setSeconds"] === "function". Actual: ' + (typeof Date.prototype["setSeconds"] ));
if (typeof Date.prototype.setUTCSeconds !== "function")  $ERROR('#57: typeof Date.prototype.setUTCSeconds === "function". Actual: ' + (typeof Date.prototype.setUTCSeconds ));
if (typeof Date.prototype['setUTCSeconds'] !== "function")  $ERROR('#58: typeof Date.prototype["setUTCSeconds"] === "function". Actual: ' + (typeof Date.prototype["setUTCSeconds"] ));
if (typeof Date.prototype.setMinutes !== "function")  $ERROR('#59: typeof Date.prototype.setMinutes === "function". Actual: ' + (typeof Date.prototype.setMinutes ));
if (typeof Date.prototype['setMinutes'] !== "function")  $ERROR('#60: typeof Date.prototype["setMinutes"] === "function". Actual: ' + (typeof Date.prototype["setMinutes"] ));
if (typeof Date.prototype.setUTCMinutes !== "function")  $ERROR('#61: typeof Date.prototype.setUTCMinutes === "function". Actual: ' + (typeof Date.prototype.setUTCMinutes ));
if (typeof Date.prototype['setUTCMinutes'] !== "function")  $ERROR('#62: typeof Date.prototype["setUTCMinutes"] === "function". Actual: ' + (typeof Date.prototype["setUTCMinutes"] ));
if (typeof Date.prototype.setHours !== "function")  $ERROR('#63: typeof Date.prototype.setHours === "function". Actual: ' + (typeof Date.prototype.setHours ));
if (typeof Date.prototype['setHours'] !== "function")  $ERROR('#64: typeof Date.prototype["setHours"] === "function". Actual: ' + (typeof Date.prototype["setHours"] ));
if (typeof Date.prototype.setUTCHours !== "function")  $ERROR('#65: typeof Date.prototype.setUTCHours === "function". Actual: ' + (typeof Date.prototype.setUTCHours ));
if (typeof Date.prototype['setUTCHours'] !== "function")  $ERROR('#66: typeof Date.prototype["setUTCHours"] === "function". Actual: ' + (typeof Date.prototype["setUTCHours"] ));
if (typeof Date.prototype.setDate !== "function")  $ERROR('#67: typeof Date.prototype.setDate === "function". Actual: ' + (typeof Date.prototype.setDate ));
if (typeof Date.prototype['setDate'] !== "function")  $ERROR('#68: typeof Date.prototype["setDate"] === "function". Actual: ' + (typeof Date.prototype["setDate"] ));
if (typeof Date.prototype.setUTCDate !== "function")  $ERROR('#69: typeof Date.prototype.setUTCDate === "function". Actual: ' + (typeof Date.prototype.setUTCDate ));
if (typeof Date.prototype['setUTCDate'] !== "function")  $ERROR('#70: typeof Date.prototype["setUTCDate"] === "function". Actual: ' + (typeof Date.prototype["setUTCDate"] ));
if (typeof Date.prototype.setMonth !== "function")  $ERROR('#71: typeof Date.prototype.setMonth === "function". Actual: ' + (typeof Date.prototype.setMonth ));
if (typeof Date.prototype['setMonth'] !== "function")  $ERROR('#72: typeof Date.prototype["setMonth"] === "function". Actual: ' + (typeof Date.prototype["setMonth"] ));
if (typeof Date.prototype.setUTCMonth !== "function")  $ERROR('#73: typeof Date.prototype.setUTCMonth === "function". Actual: ' + (typeof Date.prototype.setUTCMonth ));
if (typeof Date.prototype['setUTCMonth'] !== "function")  $ERROR('#74: typeof Date.prototype["setUTCMonth"] === "function". Actual: ' + (typeof Date.prototype["setUTCMonth"] ));
if (typeof Date.prototype.setFullYear !== "function")  $ERROR('#75: typeof Date.prototype.setFullYear === "function". Actual: ' + (typeof Date.prototype.setFullYear ));
if (typeof Date.prototype['setFullYear'] !== "function")  $ERROR('#76: typeof Date.prototype["setFullYear"] === "function". Actual: ' + (typeof Date.prototype["setFullYear"] ));
if (typeof Date.prototype.setUTCFullYear !== "function")  $ERROR('#77: typeof Date.prototype.setUTCFullYear === "function". Actual: ' + (typeof Date.prototype.setUTCFullYear ));
if (typeof Date.prototype['setUTCFullYear'] !== "function")  $ERROR('#78: typeof Date.prototype["setUTCFullYear"] === "function". Actual: ' + (typeof Date.prototype["setUTCFullYear"] ));
if (typeof Date.prototype.setYear !== "function")  $ERROR('#79: typeof Date.prototype.setYear === "function". Actual: ' + (typeof Date.prototype.setYear ));
if (typeof Date.prototype['setYear'] !== "function")  $ERROR('#80: typeof Date.prototype["setYear"] === "function". Actual: ' + (typeof Date.prototype["setYear"] ));
if (typeof Date.prototype.toLocaleString !== "function")  $ERROR('#81: typeof Date.prototype.toLocaleString === "function". Actual: ' + (typeof Date.prototype.toLocaleString ));
if (typeof Date.prototype['toLocaleString'] !== "function")  $ERROR('#82: typeof Date.prototype["toLocaleString"] === "function". Actual: ' + (typeof Date.prototype["toLocaleString"] ));
if (typeof Date.prototype.toUTCString !== "function")  $ERROR('#83: typeof Date.prototype.toUTCString === "function". Actual: ' + (typeof Date.prototype.toUTCString ));
if (typeof Date.prototype['toUTCString'] !== "function")  $ERROR('#84: typeof Date.prototype["toUTCString"] === "function". Actual: ' + (typeof Date.prototype["toUTCString"] ));
if (typeof Date.prototype.toGMTString !== "function")  $ERROR('#85: typeof Date.prototype.toGMTString === "function". Actual: ' + (typeof Date.prototype.toGMTString ));
if (typeof Date.prototype['toGMTString'] !== "function")  $ERROR('#86: typeof Date.prototype["toGMTString"] === "function". Actual: ' + (typeof Date.prototype["toGMTString"] ));




