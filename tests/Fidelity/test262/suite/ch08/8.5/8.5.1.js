/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.5/8.5.1.js
 * @description Valid Number ranges
 */

// Check range support for Number values (IEEE 754 64-bit floats having the form s*m*2**e)
//
// For normalized floats, sign (s) is +1 or -1, m (mantisa) is a positive integer less 
// than 2**53 but not less than 2**52 and e (exponent) is an integer ranging from -1074 to 971
//
// For denormalized floats, s is +1 or -1, m is a positive integer less than 2**52, and
// e is -1074
//
// Below 64-bit float values shown for informational purposes.  Values may be positive or negative.
// Infinity  >= ~1.797693134862315907729305190789e+308 >= 2**1024
// MAX_NORM   = ~1.797693134862315708145274237317e+308  = (2**53 - 1) * (2**-52) * (2**1023) = (2**53-1) * (2**971) = (2**1024) - (2**971)
// MIN_NORM   = ~2.2250738585072013830902327173324e-308 = 2**-1022
// MAX_DENORM = ~2.2250738585072008890245868760859e-308 = MIN_NORM - MIN_DENORM = (2**-1022) - (2**-1074)
// MIN_DENORM = ~4.9406564584124654417656879286822e-324 = 2**-1074
 
// Fill an array with 2 to the power of (0 ... -1075)
var value = 1;
var floatValues = new Array(1076);
for(var power = 0; power <= 1075; power++){
	floatValues[power] = value;
    // Use basic math operations for testing, which are required to support 'gradual underflow' rather
    // than Math.pow etc..., which are defined as 'implementation dependent'.
	value = value * 0.5;
}

// The last value is below min denorm and should round to 0, everything else should contain a value
if(floatValues[1075] !== 0) {
  $ERROR("Value after min denorm should round to 0");
}

// Validate the last actual value is min denorm
if(floatValues[1074] !== 4.9406564584124654417656879286822e-324) {
  $ERROR("Min denorm value is incorrect: " + floatValues[1074]);
}

// Validate that every value is half the value before it up to 1
for(var index = 1074; index > 0; index--){
  if(floatValues[index] === 0){
	$ERROR("2**-" + index + " should not be 0");
  }
  if(floatValues[index - 1] !== (floatValues[index] * 2)){
	$ERROR("Value should be double adjacent value at index " + index);
  }
}

// Max norm should be supported and compare less than inifity
if(!(1.797693134862315708145274237317e+308 < Infinity)){
	$ERROR("Max Number value 1.797693134862315708145274237317e+308 should not overflow to infinity");
}

// Numbers closer to 2**1024 then max norm should overflow to infinity
if(!(1.797693134862315808e+308 === +Infinity)){
	$ERROR("1.797693134862315808e+308 did not resolve to Infinity");
}
