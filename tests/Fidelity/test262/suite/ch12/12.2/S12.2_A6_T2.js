// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * VariableDeclaration within "try-catch" statement is allowed
 *
 * @path ch12/12.2/S12.2_A6_T2.js
 * @description Declaring variables within "try-catch" statement
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try{
	intry__intry__var=intry__intry__var;
	intry__incatch__var=intry__incatch__var;
	incatch__intry__var=incatch__intry__var;
	incatch__incatch__var=incatch__incatch__var;
}catch(e){
	$ERROR('#1: Variable declaration inside "try-catch" block is admitted');
};
//
//////////////////////////////////////////////////////////////////////////////

try{
    try {
    	var intry__intry__var;
    } catch (e) {
    	var intry__incatch__var;
    }
}catch(e){
    try {
    	var incatch__intry__var;
    } catch (e) {
        var incatch__incatch__var;
    }
    
};

