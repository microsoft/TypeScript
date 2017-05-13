// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check For Statement for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A6.1_T3.js
 * @description for (\n two semicolons \n)
 */

//CHECK#1
for(
    ;;
) {
  break;
}

