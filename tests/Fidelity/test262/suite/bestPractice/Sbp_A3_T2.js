// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration within a "do-while" Block in strict code is not allowed
 *
 * @path bestPractice/Sbp_A3_T2.js
 * @description Declaring a function within a "do-while" loop that is
 * within a strict function
 * @onlyStrict
 * @negative SyntaxError
 * @bestPractice http://wiki.ecmascript.org/doku.php?id=conventions:no_non_standard_strict_decls
 */

"use strict";
(function(){
   do {
     function __func(){};
   } while(0);
});

