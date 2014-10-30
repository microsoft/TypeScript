// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the argument "message" is not undefined, the message property of the newly constructed object is
 * set to ToString(message)
 *
 * @path ch15/15.11/15.11.1/S15.11.1.1_A1_T1.js
 * @description Checking message property of different error objects
 */

function otherScope(msg)
{
  return Error(msg);
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
var err1=Error('msg1');
if(err1.message!=="msg1"){
  $ERROR('#1: var err1=Error(\'msg1\'); err1.message==="msg1". Actual: '+err1.message);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
var err2=otherScope('msg2');
if(err2.message!=="msg2"){
  $ERROR('#2: function otherScope(msg){return Error(msg);} var err2=otherScope(\'msg2\'); err2.message==="msg2". Actual: '+err2.message);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
var err3=otherScope();
if(err3.hasOwnProperty('message')){
  $ERROR('#3: function otherScope(msg){return Error(msg);} var err3=otherScope(); err3.hasOwnProperty("message"). Actual: '+err3.message);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
var err4=eval("Error('msg4')");
if(err4.message!=="msg4"){
  $ERROR('#4: var err4=eval("Error(\'msg4\')"); err4.message==="msg4". Actual: '+err4.message);
}
//
//////////////////////////////////////////////////////////////////////////////

