// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When "break" is evaluated, (break, empty, empty) is returned
 *
 * @path ch12/12.8/S12.8_A3.js
 * @description Using "break" without Identifier within labeled loop
 */

LABEL_OUT : var x=0, y=0;

LABEL_DO_LOOP : do {
    LABEL_IN : x=2;
    break ;
    LABEL_IN_2 : var y=2;
    
    function IN_DO_FUNC(){}
} while(0);

LABEL_ANOTHER_LOOP : do {
    ;
} while(0);

function OUT_FUNC(){}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ((x!==2)&&(y!==0)) {
	$ERROR('#1: x === 2 and y === 0. Actual:  x ==='+x+' and y ==='+y);
}
//
//////////////////////////////////////////////////////////////////////////////

