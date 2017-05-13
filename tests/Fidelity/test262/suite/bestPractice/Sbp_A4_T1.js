// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration within a "while" Statement is not allowed
 *
 * @path bestPractice/Sbp_A4_T1.js
 * @description Checking if declaring a function within a "while"
 * Statement leads to an exception
 * @onlyStrict
 * @negative SyntaxError
 * @bestPractice http://wiki.ecmascript.org/doku.php?id=conventions:no_non_standard_strict_decls
 */

"use strict";
while (0) {
    function __func(){};
};

