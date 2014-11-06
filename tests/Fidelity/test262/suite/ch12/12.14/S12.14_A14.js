// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "with" statement
 *
 * @path ch12/12.14/S12.14_A14.js
 * @description Using try/catch/finally in With and With in try/catch/finally
 * @noStrict
 */

var myObj = {p1: 'a',
             p2: 'b',
             p3: 'c',
             value: 'myObj_value',
             valueOf : function(){return 'obj_valueOf';},
             parseInt : function(){return 'obj_parseInt';},
             NaN : 'obj_NaN',
             Infinity : 'obj_Infinity',
             eval     : function(){return 'obj_eval';},
             parseFloat : function(){return 'obj_parseFloat';},
             isNaN      : function(){return 'obj_isNaN';},
             isFinite   : function(){return 'obj_isFinite';}
}

// CHECK#1
try{
  with(myObj){
    throw "ex";
  }
}
catch(e){
  if (e!=="ex") $ERROR('#1: Exception ==="ex". Actual:  Exception ==='+ e  );
}

// CHECK#2
with(myObj){
  try{
    throw p1;
  }
  catch(e){
    if (e!=="a") $ERROR('#2.1: Exception ==="a". Actual:  Exception ==='+ e  );
    p1='pass';
  }
}
if(myObj.p1!=='pass') $ERROR('#2.2: "throw p1" lead to throwing exception');

// CHECK#3
with(myObj){
  try{
    p1='fail';
    throw p2;
  }
  catch(e){
    if (e!=="b") $ERROR('#3.1: Exception ==="b". Actual:  Exception ==='+ e  );
    p1='pass';
  }
  finally{
    p2='pass';
  }
}
if(myObj.p1!=='pass') $ERROR('#3.2: "throw p2" lead to throwing exception');
if(myObj.p2!=='pass') $ERROR('#3.3: "finally" block must be evaluated');

// CHECK#4
myObj.p1='fail';
try{
  with(myObj){
    try{
      throw p3;
    }
    finally{
      p1='pass';
    }
  }
}
catch(e){}
if(myObj.p1!=='pass') $ERROR('#4: "finally" block must be evaluated');

