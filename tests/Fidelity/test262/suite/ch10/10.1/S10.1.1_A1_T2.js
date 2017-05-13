// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Program functions are defined in source text by a FunctionDeclaration or created dynamically either
 * by using a FunctionExpression or by using the built-in Function object as a constructor
 *
 * @path ch10/10.1/S10.1.1_A1_T2.js
 * @description Creating function dynamically by using a FunctionExpression
 */

//CHECK#1
var x=function f1(){return 1;}();
if(x!==1)
  $ERROR('#1: Create function dynamically either by using a FunctionExpression');

//CHECK#2
var y=function  (){return 2;}();
if(y!==2){
  $ERROR('#2: Create an anonymous function dynamically either by using a FunctionExpression');
}

//CHECK#2
var z = (function(){return 3;})();
if(z!==3){
  $ERROR('#3: Create an anonymous function dynamically either by using a FunctionExpression wrapped in a group operator');
}

