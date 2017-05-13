// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "for" statement
 *
 * @path ch12/12.14/S12.14_A11_T4.js
 * @description Try statement inside loop, where combinate using break and continue
 */

// CHECK#1
var c1=0,fin=0;
for(var i=0;i<5;i++){
  try{
    c1+=1;
    break;
  }
  catch(er1){}
  finally{
    fin=1;
    continue;
  }
  fin=-1;
  c1+=2;
}
if(fin!==1){
  $ERROR('#1.1: "finally" block must be evaluated');
}
if(c1!==5){
  $ERROR('#1.2: "try{break} catch finally{continue}" must work correctly');
}

// CHECK#2
var c2=0,fin2=0;
for(var i=0;i<5;i++){
  try{
    throw "ex1";
  }
  catch(er1){
    c2+=1;
    break;
  }
  finally{
    fin2=1;
    continue;
  }
  c2+=2;
  fin2=-1;
}
if(fin2!==1){
  $ERROR('#2.1: "finally" block must be evaluated');
}
if(c2!==5){
  $ERROR('#2.2: "try catch{break} finally{continue}" must work correctly');
}

