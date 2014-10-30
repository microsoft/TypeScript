// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration within a "do-while" Block is not allowed
 *
 * @path bestPractice/Sbp_12.6.1_A13_T3.js
 * @description Declaring a function within a "do-while" loop that is within a function declaration itself
 * @negative
 */

function(){

do{
    function __func(){};
}while(0);

};

