// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Calling a function as a constructor is possible as long as this.any_Function is declared and called
 *
 * @path ch13/13.2/S13.2.2_A12.js
 * @description Calling a function as a constructor after it has been declared with "function func()"
 */

function FACTORY(){
   this.id = 0;
      
   this.id = func();
   
   function func(){
      return "id_string";
   }
     
}
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	var obj = new FACTORY();
} catch (e) {
	$ERROR('#1: var obj = new FACTORY() does not lead to throwing exception. Actual: Exception is '+e);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (obj.id !== "id_string") {
	$ERROR('#2: obj.id === "id_string". Actual: obj.id ==='+obj.id);
}
//
//////////////////////////////////////////////////////////////////////////////

