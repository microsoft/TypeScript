// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Native ECMAScript objects have an internal property called [[Prototype]]. The value of this property is
 * either null or an object and is used for implementing inheritance
 *
 * @path ch08/8.6/8.6.2/S8.6.2_A1.js
 * @description Check [[Prototype]] property of object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
var __obj={};
if (!Object.prototype.isPrototypeOf(__obj)){
  $ERROR('#1: Native ECMAScript objects have an internal property called [[Prototype]]. ');
};
//
//////////////////////////////////////////////////////////////////////////////

//Establish proto (base) object
/*function ProtoObj(){
  
};*/
var protoObj={};
//Establish foo object
function FooObj(){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
// Invoke instance of foo object
var obj__= new FooObj;

if (!Object.prototype.isPrototypeOf(obj__)){
  $ERROR('#2.1: protoObj={}; function FooObj(){}; var obj__= new FooObj; Object.prototype.isPrototypeOf(obj__) === true. Actual: ' + (Object.prototype.isPrototypeOf(obj__)));
};

if (!FooObj.prototype.isPrototypeOf(obj__)){
  $ERROR('#2.2: protoObj={}; function FooObj(){}; var obj__= new FooObj; FooObj.prototype.isPrototypeOf(obj__) === true. Actual: ' + (FooObj.prototype.isPrototypeOf(obj__)));
};

if (protoObj.isPrototypeOf(obj__)){
  $ERROR('#2.3: protoObj={}; function FooObj(){}; var obj__= new FooObj; protoObj.isPrototypeOf(obj__) === false. Actual: ' + (protoObj.isPrototypeOf(obj__)));
};
// Establish inheritance from proto object
FooObj.prototype=protoObj;

if (protoObj.isPrototypeOf(obj__)){
  $ERROR('#2.4: protoObj={}; function FooObj(){}; var obj__= new FooObj; FooObj.prototype=protoObj; protoObj.isPrototypeOf(obj__) === false. Actual: ' + (protoObj.isPrototypeOf(obj__)));
};
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3

// Invoke instance of foo object
var __foo=new FooObj;

if (!Object.prototype.isPrototypeOf(__foo)){
  $ERROR('#3.1: protoObj={}; function FooObj(){}; var obj__= new FooObj; FooObj.prototype=protoObj; var __foo=new FooObj; Object.prototype.isPrototypeOf(__foo) === true. Actual: ' + (Object.prototype.isPrototypeOf(__foo)));
};

if (!FooObj.prototype.isPrototypeOf(__foo)){
  $ERROR('#3.2: protoObj={}; function FooObj(){}; var obj__= new FooObj; FooObj.prototype=protoObj; var __foo=new FooObj; FooObj.prototype.isPrototypeOf(__foo) === true. Actual: ' + (FooObj.prototype.isPrototypeOf(__foo)));
};

if (!protoObj.isPrototypeOf(__foo)){
  $ERROR('#3.3: protoObj={}; function FooObj(){}; var obj__= new FooObj; FooObj.prototype=protoObj; var __foo=new FooObj; protoObj.isPrototypeOf(__foo) === true. Actual: ' + (protoObj.isPrototypeOf(__foo)));
};
//
//////////////////////////////////////////////////////////////////////////////

