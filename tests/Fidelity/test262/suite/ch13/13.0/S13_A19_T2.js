// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "var" does not override function declaration
 *
 * @path ch13/13.0/S13_A19_T2.js
 * @description Creating a function and a variable with identical Identifiers within function scope
 */

(function (){

    // since "var" does not override function declaration __decl is set to function
    //////////////////////////////////////////////////////////////////////////////
    //CHECK#1
    if (typeof __decl !== "function") {
    	$ERROR('#1: typeof __decl === "function". Actual: typeof __decl ==='+typeof __decl);
    }
    //
    //////////////////////////////////////////////////////////////////////////////
    
    var __decl = 1;
    
    //since statement was evaluted __decl turns to 1 from function
    //////////////////////////////////////////////////////////////////////////////
    //CHECK#2
    if (__decl !== 1) {
    	$ERROR('#2: __decl === 1. Actual: __decl ==='+__decl);
    }
    //
    //////////////////////////////////////////////////////////////////////////////

    function __decl(){return 1;}
})();    

