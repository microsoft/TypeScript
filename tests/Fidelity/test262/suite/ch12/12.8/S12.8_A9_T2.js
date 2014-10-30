// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "break" within "try/catch" statement that is nested in a loop is allowed
 *
 * @path ch12/12.8/S12.8_A9_T2.js
 * @description Using "continue Identifier" within "catch" statement
 */

var x=0,y=0;

(function(){
FOR : for(;;){
	try{
		x++;
		if(x===10)return;
		throw 1;
	} catch(e){
		break ;
	}	
}
})();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (x!==1) {
	$ERROR('#1: break inside of try-catch nested in loop is allowed');
}
//
//////////////////////////////////////////////////////////////////////////////

