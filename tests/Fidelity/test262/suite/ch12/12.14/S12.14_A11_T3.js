// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "for" statement
 *
 * @path ch12/12.14/S12.14_A11_T3.js
 * @description Try statement inside loop, where use break
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
  }
  fin=-1;
  c1+=2;
};
if(fin!==1){
  $ERROR('#1.1: "finally" block must be evaluated');
}
if(c1!==1){
  $ERROR('#1.2: "try{break}catch finally" must work correctly');
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
  }
  c2+=2;
  fin2=-1;
};
if(fin2!==1){
  $ERROR('#2.1: "finally" block must be evaluated');
}
if(c2!==1){
  $ERROR('#2.2: "try catch{break} finally" must work correctly');
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
    break;
  }
  c3+=2;
  fin3=0;
};
if(fin3!==1){
  $ERROR('#3.1: "finally" block must be evaluated');
}
if(c3!==1){
  $ERROR('#3.2: "try catch finally{break}" must work correctly');
}

// CHECK#4
var c4=0,fin4=0;
for(var i=0;i<5;i++){
  try{
    c4+=1;
    break;
  }
  finally{
    fin4=1;
  }
  fin4=-1;
  c4+=2;
};
if(fin4!==1){
  $ERROR('#4.1: "finally" block must be evaluated');
}
if(c4!==1){
  $ERROR('#4.2: "try{break} finally" must work correctly');
}

// CHECK#5
for(var i=0;i<5;i++){
  try{
    throw "ex1";
  }
  catch(er1){
    break;
  }
};
if(i!==0){
  $ERROR('#5: "try catch{break}" must work correctly');
}

// CHECK#6
var c6=0;
for(var c6=0;c6<5;){
  try{
    c6+=1;
    break;
  }
  catch(er1){}
  c6+=2;
};
if(c6!==1){
  $ERROR('#6: "try{break} catch" must work correctly');
}

// CHECK#7
var c7=0,fin7=0;
try{
  for(var c7=0;c7<5;){
    try{
      c7+=1;
      throw "ex1";
    }
    finally{
      fin7=1;
      break;
    }
    fin7=-1;
    c7+=2;
  }
}
catch(ex1){
  c7=10;
}
if(fin7!==1){
  $ERROR('#7.1: "finally" block must be evaluated');
}
if(c7!==1){
  $ERROR('#7.2: "try finally{break}" must work correctly');
}

