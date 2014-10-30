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
 * @path ch15/15.3/15.3.2/S15.3.2.1_A1_T1.js
 * @description The body of the function is "{toString:function(){throw 7;}}"
 */

var body = {toString:function(){throw 7;}}

//CHECK#1
try {
  var f = new Function(body);
  $FAIL('#1: When the Function constructor is called with one argument then body be that argument the following step are taken: call ToString(body)');
} catch (e) {
  if (e !== 7) {
  	$ERROR('#1.1: When the Function constructor is called with one argument then body be that argument the following step are taken: call ToString(body)');
  }
}

