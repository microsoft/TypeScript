// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * We overload valueOf method so it return non Primitive value and toString method so it return non Primitive value too
 * Thus [[DefaultValue]] must generate TypeError error
 *
 * @path ch08/8.12/8.12.8/S8.12.8_A4.js
 * @description Try to overload toString and valueOf methods, they returned new Objects
 */

try
{
  var __obj = {valueOf:function(){return new Object;},toString: function() {return new Object();}}  
  Number(__obj);
  $ERROR('#1.1: var __obj = {valueOf:function(){return new Object;},toNumber: function() {return new Object();}}; Number(__obj) throw TypeError. Actual: ' + (Number(__obj)));
}
catch(e)
{
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: var __obj = {valueOf:function(){return new Object;},toNumber: function() {return new Object();}}; Number(__obj) throw TypeError. Actual: ' + (e));
  }  
}  

