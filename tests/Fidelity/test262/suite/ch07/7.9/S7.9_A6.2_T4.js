// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check For Statement for automatic semicolon insertion.
 * If automatic insertion semicolon would become one of the two semicolons in the header of a For Statement.
 * Use one semicolon
 *
 * @path ch07/7.9/S7.9_A6.2_T4.js
 * @description For header is (\n \n semicolon)
 * @negative
 */

//CHECK#1
for(
    
;) {
  break;
}

