// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "try" with "catch" or "finally" statement within/without an "do while" statement
 *
 * @path ch12/12.14/S12.14_A9_T2.js
 * @description "try" statement within a loop, the statement contains "continue" statement
 */

// CHECK#1
var c1=0,fin=0;
do{
  try{
    c1+=1;
    continue;
  }
  catch(er1){}
  finally{
    fin=1;
  }
  fin=-1;
}
while(c1<2);
if(fin!==1){
  $ERROR('#1: "finally" block must be evaluated at "try{continue} catch finally" construction');
}

// CHECK#2
var c2=0,fin2=0;
do{
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
while(c2<2);
if(fin2!==1){
  $ERROR('#2: "finally" block must be evaluated at "try catch{continue} finally" construction');
}

// CHECK#3
var c3=0,fin3=0;
do{
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
while(c3<2);
if(fin3!==1){
  $ERROR('#3: "finally" block must be evaluated at "try catch finally{continue}" construction');
}

// CHECK#4
var c4=0,fin4=0;
do{
  try{
    c4+=1;
    continue;
  }
  finally{
    fin4=1;
  }
  fin4=-1;
}
while(c4<2);
if(fin4!==1){
  $ERROR('#4: "finally" block must be evaluated at "try{continue} finally"  construction');
}

// CHECK#5
var c5=0;
do{
  try{
    throw "ex1";
  }
  catch(er1){
    c5+=1;
    continue;
  }
}
while(c5<2);
if(c5!==2){
  $ERROR('#5: "try catch{continue}" must work correctly');
}

// CHECK#6
var c6=0,fin6=0;
do{
  try{
    c6+=1;
    throw "ex1"
  }
  finally{
    fin6=1;
    continue;
  }
  fin6=-1;
}
while(c6<2);
if(fin6!==1){
  $ERROR('#6.1: "finally" block must be evaluated');
}
if(c6!==2){
  $ERROR('#6.2: "try finally{continue}" must work correctly');
}

