// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegularExpressionChar :: LineTerminator is incorrect
 *
 * @path ch07/7.8/7.8.5/S7.8.5_A2.3_T2.js
 * @description Line Feed, with eval
 */

//CHECK#1
try {
   eval("/a\u000A/").source;
   $ERROR('#1.1: RegularExpressionChar :: Line Feedis incorrect. Actual: ' + (eval("/a\u000A/").source)); 
}
catch (e) {
  if ((e instanceof SyntaxError) !== true) {
     $ERROR('#1.2: RegularExpressionChar :: Line Feed is incorrect. Actual: ' + (e));
  }
}     

