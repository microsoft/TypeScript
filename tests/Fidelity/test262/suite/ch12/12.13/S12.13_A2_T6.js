// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "throw Expression" returns (throw, GetValue(Result(1)), empty), where 1 evaluates Expression
 *
 * @path ch12/12.13/S12.13_A2_T6.js
 * @description Throwing object
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
             isFinite   : function(){return 'obj_isFinite';},
             i:7
}

try{
  throw myObj;
}
catch(e){	
// CHECK#1
  if (e.p1!=="a") $ERROR('#1: e.p1 === "a". Actual:  e.p1 ==='+ e.p1  );
// CHECK#2
  if (e.value!=='myObj_value') $ERROR('#2: e.p1 === \'myObj_value\'. Actual:  e.p1 ==='+ e.p1  );
// CHECK#3
  if (e.eval()!=='obj_eval') $ERROR('#3: e.p1 === \'obj_eval\'. Actual:  e.p1 ==='+ e.p1  );
}

// CHECK#4
myObj.i=6
try{
  throw myObj;
}
catch(e){}
if (myObj.i!==6) $ERROR('#4: Handling of catch must be correct');

