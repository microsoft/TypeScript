// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T3.js
 * @description Checking by using eval
 */

var split = String.prototype.split.bind(this);

var __obj__lim = {valueOf:function(){return 5;}};

try {
    toString = Object.prototype.toString;
} catch(e) { ; }

//Checks are only valid if we can overwrite the global object's toString method
//(which ES5 doesn't even require to exist)
if (toString===Object.prototype.toString) {
    var __class__ = toString();

    var __split = split(eval("\"[\""),__obj__lim);

    //////////////////////////////////////////////////////////////////////////////
    //CHECK#1
    if (typeof __split !== "object") {
        $ERROR('#1: typeof __split === "object". Actual: '+typeof __split );
    }
    //
    //////////////////////////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////////////////////////
    //CHECK#2
    if (__split.constructor !== Array) {
        $ERROR('#2: __split.constructor === Array. Actual: '+__split.constructor );
    }
    //
    //////////////////////////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////////////////////////
    //CHECK#3
    if (__split.length !== 2) {
        $ERROR('#3: __split.length === 2. Actual: '+__split.length );
    }
    //
    //////////////////////////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////////////////////////
    //CHECK#3
    if (__split[1].substring(0,6) !== "object") {
        $ERROR('#4: __split[1].substring(0,6) === "object". Actual: '+__split[1].substring(0,6) );
    }
    //
    //////////////////////////////////////////////////////////////////////////////
}
