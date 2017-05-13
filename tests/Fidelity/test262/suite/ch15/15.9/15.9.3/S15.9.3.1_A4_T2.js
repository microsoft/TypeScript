// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Value]] property of the newly constructed object
 * is set by following steps:
 * 1. Call ToNumber(year)
 * 2. Call ToNumber(month)
 * 3. If date is supplied use ToNumber(date)
 * 4. If hours is supplied use ToNumber(hours)
 * 5. If minutes is supplied use ToNumber(minutes)
 * 6. If seconds is supplied use ToNumber(seconds)
 * 7. If ms is supplied use ToNumber(ms)
 *
 * @path ch15/15.9/15.9.3/S15.9.3.1_A4_T2.js
 * @description 3 arguments, (year, month, date)
 */

var myObj = function(val){
  this.value = val;
  this.valueOf = function(){throw "valueOf-"+this.value;};
  this.toString = function(){throw "toString-"+this.value;};
};

//CHECK#1
try{
  var x1 = new Date(new myObj(1), new myObj(2), new myObj(3));
  $ERROR("#1: The 1st step is calling ToNumber(year)");
}
catch(e){
  if(e !== "valueOf-1"){
    $ERROR("#1: The 1st step is calling ToNumber(year)");
  }
}

//CHECK#2
try{
  var x2 = new Date(1, new myObj(2), new myObj(3));
  $ERROR("#2: The 2nd step is calling ToNumber(month)");
}
catch(e){
  if(e !== "valueOf-2"){
    $ERROR("#2: The 2nd step is calling ToNumber(month)");
  }
}

//CHECK#3
try{
  var x3 = new Date(1, 2, new myObj(3));
  $ERROR("#3: The 3rd step is calling ToNumber(date)");
}
catch(e){
  if(e !== "valueOf-3"){
    $ERROR("#3: The 3rd step is calling ToNumber(date)");
  }
}

