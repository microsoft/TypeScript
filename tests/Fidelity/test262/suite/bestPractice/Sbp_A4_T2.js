// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration within a "while" Statement is not allowed
 *
 * @path bestPractice/Sbp_A4_T2.js
 * @description Checking if declaring a function within a "while"
 *  Statement that is in a function call leads to an exception
 * @onlyStrict
 * @negative SyntaxError
 * @bestPractice http://wiki.ecmascript.org/doku.php?id=conventions:no_non_standard_strict_decls
 */

"use strict";
(function(){
   while (0) {
     function __func(){};
   };
})();

