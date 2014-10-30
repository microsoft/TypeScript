// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.concat([,[...]]) can accept at least 128
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A2.js
 * @description Call concat([,[...]]) function with 128 arguments
 */

var __instance = new Number();

__instance.concat = String.prototype.concat;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.concat(
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF,
0,1,2,3,4,5,6,7,8,9,0xA,0xB,0xC,0xD,0xE,0xF
) !== "001234567891011121314150123456789101112131415012345678910111213141501234567891011121314150123456789101112131415012345678910111213141501234567891011121314150123456789101112131415") {
  $ERROR('#1: Call concat([,[...]]) function with 128 arguments does not lead to throwing any errors');
}
//
//////////////////////////////////////////////////////////////////////////////



