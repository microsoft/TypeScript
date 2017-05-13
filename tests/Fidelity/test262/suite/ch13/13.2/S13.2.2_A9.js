// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Calling a function as a constructor is inadmissible as long as this.any_Function is called before it is declared
 *
 * @path ch13/13.2/S13.2.2_A9.js
 * @description Calling a function as a constructor
 */

function FACTORY(){
   this.id = 0;
   
   this.id = this.func();
   
   this.func = function (){
      return 5;
   }
  
}
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	var obj = new FACTORY();
	$ERROR('#1: var obj = new FACTORY() lead to throwing exception');
} catch (e) {
    if (e instanceof Test262Error) throw e;
}
//
//////////////////////////////////////////////////////////////////////////////

