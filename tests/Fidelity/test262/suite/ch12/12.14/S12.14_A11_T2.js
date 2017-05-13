// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "for" statement
 *
 * @path ch12/12.14/S12.14_A11_T2.js
 * @description Try statement inside loop, where use continue loop
 */

// CHECK#1
var fin=0;
for(var i=0;i<5;i++){
  try{
    i+=1;
    continue;
  }
  catch(er1){}
  finally{
    fin=1;
  }
  fin=-1;
}
if(fin!==1){
  $ERROR('#1: "finally" block must be evaluated at "try{continue} catch finally" construction');
}

// CHECK#2
var c2=0,fin2=0;
for(var i=0;i<5;i++){
  try{
    throw "ex1";
  }
  catch(er1){
    c2+=1;
    continue;
  }
  finally{
    fin2=1;
  }
  fin2=-1;
}
if(fin2!==1){
  $ERROR('#2.1: "finally" block must be evaluated');
}
if(c2!==5){
  $ERROR('#2.1: "try catch{continue} finally" must work correctly');
}

// CHECK#3
var c3=0,fin3=0;
for(var i=0;i<5;i++){
  try{
    throw "ex1";
  }
  catch(er1){
    c3+=1;
  }
  finally{
    fin3=1;
    continue;
  }
  fin3=0;
}
if(fin3!==1){
  $ERROR('#3.1: "finally" block must be evaluated');
}
if(c3!==5){
  $ERROR('#3.2: "try catch finally{continue}" must work correctly');
}

// CHECK#4
var fin=0;
for(var i=0;i<5;i++){
  try{
    i+=1;
    continue;
  }
  finally{
    fin=1;
  }
  fin=-1;
};
if(fin!==1){
  $ERROR('#4: "finally" block must be evaluated at "try{continue} finally" construction');
}

// CHECK#5
var c5=0;
for(var c5=0;c5<10;){
  try{
    throw "ex1";
  }
  catch(er1){
    c5+=1;
    continue;
  }
  c5+=12;
};
if(c5!==10){
  $ERROR('#5: "try catch{continue} must work correctly');
}

// CHECK#6
var c6=0,fin6=0;
for(var c6=0;c6<10;){
  try{
    c6+=1;
    throw "ex1"
  }
  finally{
    fin6=1;
    continue;
  }
  fin6=-1;
};
if(fin6!==1){
  $ERROR('#6.1: "finally" block must be evaluated');
}
if(c6!==10){
  $ERROR('#6.2: "try finally{continue}" must work correctly');
}

