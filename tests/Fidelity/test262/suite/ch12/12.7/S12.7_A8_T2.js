// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Appearing of "continue" within a "try/catch" Block yields SyntaxError
 *
 * @path ch12/12.7/S12.7_A8_T2.js
 * @description Checking if execution of "continue" within catch Block fails
 * @negative
 */

var x=0,y=0;

try{
	LABEL1 : do {
		x++;
		throw "gonna leave it";
		y++;
	} while(0);
	$ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
	continue;
	LABEL2 : do {
		x++;
		y++;
	} while(0);
};

