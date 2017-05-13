// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global FunctionDeclaration cannot be defined within the body of another FunctionDeclaration
 *
 * @path ch14/14.0/S14_A3.js
 * @description Declaring a function within the body of another function
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __func !== "function") {
	$ERROR('#1: typeof __func === "function". Actual:  typeof __func ==='+ typeof __func  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (typeof __gunc !== "undefined") {
	$ERROR('#2: typeof __gunc === "undefined". Actual:  typeof __gunc ==='+ typeof __gunc  );
}
//
//////////////////////////////////////////////////////////////////////////////

function __func(){
    function __gunc(){return true};
}

