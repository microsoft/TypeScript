// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Function constructor is called with one argument then body be that argument and the following steps are taken:
 * i) Call ToString(body)
 * ii) If P is not parsable as a FormalParameterListopt then throw a SyntaxError exception
 * iii) If body is not parsable as FunctionBody then throw a SyntaxError exception
 * iv) Create a new Function object as specified in 13.2 with parameters specified by parsing P as a FormalParameterListopt and body specified by parsing body as a FunctionBody.
 * Pass in a scope chain consisting of the global object as the Scope parameter
 * v) Return Result(iv)
 *
 * @path ch15/15.3/15.3.2/S15.3.2.1_A1_T9.js
 * @description Value of the function constructor argument is "return arguments[0];"
 */

var f = new Function("return arguments[0];");

//CHECK#1
if (!(f instanceof Function)) {
  $ERROR('#3: When the Function constructor is called with one argument then body be that argument and the following steps are taken...');
}

//CHECK#2
if (f("A") !== "A") {
  $ERROR('#2: When the Function constructor is called with one argument then body be that argument and the following steps are taken...');
}

