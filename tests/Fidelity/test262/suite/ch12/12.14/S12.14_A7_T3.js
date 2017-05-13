// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Evaluating the nested productions TryStatement
 *
 * @path ch12/12.14/S12.14_A7_T3.js
 * @description Checking if the production of nested TryStatement statements evaluates correct
 */

// CHECK#1
try{
  try{
    throw "ex2";
  }
  catch(er2){
    if (er2!=="ex2") $ERROR('#1.1: Exception === "ex2". Actual:  Exception ==='+er2);
    throw "ex1";
  }
  finally{
    throw "ex3";
  }
}
catch(er1){
  if (er1!=="ex3") $ERROR('#1.2: Exception === "ex3". Actual:  Exception ==='+er1);
  if (er1==="ex2") $ERROR('#1.3: Exception !=="ex2". Actual: catch previous catched exception');
  if (er1==="ex1") $ERROR('#1.4: Exception !=="ex1". Actual: catch previous embedded exception');
}

// CHECK#2
var c2=0;
try{
  throw "ex1";
}
catch(er1){
  try{
    throw "ex2";
  }
  catch(er1){
    if (er1==="ex1") $ERROR('#2.1: Exception !=="ex1". Actual: catch previous catched exception');
    if (er1!=="ex2") $ERROR('#2.2: Exception === "ex2". Actual:  Exception ==='+er1);
  }
  finally{
    c2=1;
  }
  if (er1!=="ex1") $ERROR('#2.3: Exception === "ex1". Actual:  Exception ==='+er1);
  if (er1==="ex2") $ERROR('#2.4: Exception !== "ex2". Actual: catch previous embedded exception');
}
if (c2!==1)	$ERROR('#2.5: "finally" block must be evaluated');

// CHECK#3
var c3=0;
try{
  throw "ex1";
}
catch(er1){
  if (er1!=="ex1") $ERROR('#3.1: Exception === "ex1". Actual:  Exception ==='+er1);
}
finally{
  try{
    throw "ex2";
  }
  catch(er1){
    if (er1==="ex1") $ERROR('#3.2: Exception !=="ex1". Actual: catch previous catched exception');
    if (er1!=="ex2") $ERROR('#3.3: Exception === "ex2". Actual:  Exception ==='+er1);
  }
  finally{
    c3=1;
  }
}
if (c3!==1)	$ERROR('#3.4: "finally" block must be evaluated');

// CHECK#4
var c4=0;
try{
  try{
    throw "ex1";
  }
  catch(er1){
    try{
      throw "ex2";
    }
    catch(er1){
      if (er1==="ex1") $ERROR('#4.1: Exception !=="ex2". Actual: catch previous catched exception');
      if (er1!=="ex2") $ERROR('#4.2: Exception === "ex2". Actual:  Exception ==='+er1);
    }
    finally{
      c4=2;
      throw "ex3";
    }
    if (er1!=="ex1") $ERROR('#4.3: Exception === "ex2". Actual:  Exception ==='+er1);
    if (er1==="ex2") $ERROR('#4.4: Exception !=="ex2". Actual: catch previous catched exception');
    if (er1==="ex3") $ERROR('#4.5: Exception !=="ex3". Actual: Catch previous embedded exception');
  }
  finally{
    c4*=2;
  }
}
catch(er1){}
if (c4!==4) $ERROR('#4.6: "finally" block must be evaluated');

// CHECK#5
var c5=0;
try{
  try{
    throw "ex2";
  }
  catch(er1){
    if (er1!=="ex2") $ERROR('#5.1: Exception === "ex2". Actual:  Exception ==='+er1);
  }
  finally{
    throw "ex3";
  }
  throw "ex1";
}
catch(er1){
  if (er1!=="ex3") $ERROR('#5.2: Exception === "ex3". Actual:  Exception ==='+er1);
  if (er1==="ex2") $ERROR('#5.3: Exception !=="ex2". Actual: catch previous catched exception');
  if (er1==="ex1") $ERROR('#5.4: Exception !=="ex1". Actual: catch previous embedded exception');
}
finally{
  c5=1;
}
if (c5!==1) $ERROR('#5.5: "finally" block must be evaluated');

// CHECK#6
var c6=0;
try{
  try{
    throw "ex1";
  }
  catch(er1){
    if (er1!=="ex1") $ERROR('#6.1: Exception === "ex1". Actual:  Exception ==='+er1);
  }
  finally{
    c6=2;
  }
}
finally{
  c6*=2;
}
if (c6!==4) $ERROR('#6.2: "finally" block must be evaluated');

// CHECK#7
var c7=0;
try{
  try{
    throw "ex1";
  }
  finally{
    try{
      c7=1;
      throw "ex2";
    }
    catch(er1){
      if (er1!=="ex2") $ERROR('#7.1: Exception === "ex2". Actual:  Exception ==='+er1);
      if (er1==="ex1") $ERROR('#7.2: Exception !=="ex2". Actual: catch previous catched exception');
      c7++;
    }
    finally{
      c7*=2;
    }
  }
}
catch(er1){
  if (er1!=="ex1") $ERROR('#7.3: Exception === "ex1". Actual:  Exception ==='+er1);
}
if (c7!==4) $ERROR('#7.4: "finally" block must be evaluated');

