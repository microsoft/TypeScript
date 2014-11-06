// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * No matter how control leaves the embedded 'Statement',
 * the scope chain is always restored to its former state
 *
 * @path ch12/12.10/S12.10_A3.8_T4.js
 * @description Declaring function constructor within "with" statement, leading to completion by exception
 * @noStrict
 */

this.p1 = 1;

var result = "result";

var myObj = {
    p1: 'a', 
    value: 'myObj_value',
    valueOf : function(){return 'obj_valueOf';}
}

try {
    with(myObj){
        var __FACTORY = function(){
            p1 = 'x1';
            throw value;
        }
        var obj = new __FACTORY;
    }
} catch(e){
    result = p1;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if(result !== 1){
  $ERROR('#1: result === 1. Actual:  result ==='+ result  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if(p1 !== 1){
  $ERROR('#2: p1 === 1. Actual:  p1 ==='+ p1  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if(myObj.p1 !== "x1"){
  $ERROR('#3: myObj.p1 === "x1". Actual:  myObj.p1 ==='+ myObj.p1  );
}
//
//////////////////////////////////////////////////////////////////////////////

