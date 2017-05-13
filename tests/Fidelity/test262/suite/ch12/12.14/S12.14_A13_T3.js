// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement with a "return" statement
 *
 * @path ch12/12.14/S12.14_A13_T3.js
 * @description Using try/catch/finally syntax construction
 */

// CHECK#1
var c1=0;
function myFunction1(){
  try{
    return 1;
  }catch(err){
    $ERROR('#1.1: "return 1" inside function does not lead to throwing exception');
    return 0;
  }finally{
    c1=1;
  }
  return 2;
}
var x1=myFunction1();
if(x1!==1){
  $ERROR('#1.3: x1===1. Actual: x1==='+x1);
}
if (c1!==1){
  $ERROR('#1.4: "finally" block must be evaluated');
}

// CHECK#2
var c2=0;
function myFunction2(){
  try{
    throw "exc";
    return 1;
  }catch(err){  	
    return 0;
  }finally{
    c2=1;
  }
  return 2;
}
var x2=myFunction2();
if (c2!==1){
  $ERROR('#2.1: "finally" block must be evaluated');
}
if (x2!==0){
  $ERROR('#2.2: x2===0. Actual: x2==='+x2);
}

// CHECK#3
var c3=0;
function myFunction3(){
  try{
    return someValue;
  }catch(err){  	
    return 1;
  }finally{
    c3=1;
  }
  return 2;
}
var x3=myFunction3();
if (c3!==1){
  $ERROR('#3.1: "finally" block must be evaluated');
}
if (x3!==1){
  $ERROR('#3.2: x3===1. Actual: x3==='+x3);
}

// CHECK#4
var c4=0;
function myFunction4(){
  try{
    throw "ex1";
    return 1;
  }catch(err){
    throw "ex2"
    return 0;
  }finally{
    c4=1;
  }
  return 2;
}
try{
  var x4=myFunction4();
  $ERROR('#4.1: Throwing exception inside function lead to throwing exception outside this function');
}
catch(e){
  if(e==="ex1"){
    $ERROR('#4.2: Exception !== "ex1". Actual: catch previous exception');
  }
  if(e!=="ex2"){
    $ERROR('#4.3: Exception === "ex2". Actual:  Exception ==='+ e  );
  }
  if (c4!==1){
    $ERROR('#4.4: "finally" block must be evaluated');
  }	
}

// CHECK#5
var c5=0;
function myFunction5(){
  try{
    throw "ex1";
    return 1;
  }catch(err){
    return 0;
  }finally{
    c5=1;
    throw "ex2";
  }
  return 2;
}
try{
  var x5=myFunction5();
  $ERROR('#5.1: Throwing exception inside function lead to throwing exception outside this function');
}
catch(e){
  if(e==="ex1"){
    $ERROR('#5.2: Exception !== "ex1". Actual: catch previous exception');
  }
  if(e!=="ex2"){
    $ERROR('#5.3: Exception === "ex2". Actual:  Exception ==='+ e  );
  }
  if (c5!==1){
    $ERROR('#5.4: "finally" block must be evaluated');
  } 	
}

// CHECK#6
var c6=0;
function myFunction6(){
  try{
    throw "ex1";
    return 1;
  }catch(err){
    throw "ex2";
    return 0;
  }finally{
    c6=1;
    throw "ex3";
  }
  return 2;
}
try{
  var x6=myFunction6();
  $ERROR('#6.1: Throwing exception inside function lead to throwing exception outside this function');
}
catch(e){
  if(e==="ex1"){
    $ERROR('#6.2: Exception !== "ex1". Actual: catch previous exception');
  }
  if(e==="ex2"){
    $ERROR('#6.3: Exception !== "ex2". Actual: catch previous exception');
  }
  if(e!=="ex3"){
    $ERROR('#6.4: Exception === "ex3". Actual:  Exception ==='+ e  );
  }	
  if(c6!==1) $ERROR('#6.5: "finally" block must be evaluated');
}

// CHECK#7
var c7=0;
function myFunction7(){
  try{
    throw "ex1";
    return 1;
  }catch(err){
    throw "ex2";
    return 0;
  }finally{
    c7=1;
    return 2;
  }
  return 3;
}
try{
  var x7=myFunction7();
  if(x7!==2) $ERROR('#7.1: x7===2. Actual: x7==='+x7);
}
catch(e){}
if(c7!==1) $ERROR('#7.2: "finally" block must be evaluated');

