// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration within a "for-in" Statement is not allowed
 *
 * @path bestPractice/Sbp_12.6.4_A13_T3.js
 * @description Declaring function within a "for-in" Statement that is within function declaration
 * @negative
 */

function(){

for(x in this){
    function __func(){};
};

};

