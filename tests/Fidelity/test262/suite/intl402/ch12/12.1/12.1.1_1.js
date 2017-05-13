// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that an object can't be re-initialized as a DateTimeFormat.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    var obj, error;
    
    // variant 1: use constructor in a "new" expression
    obj = new Constructor();
    try {
        Intl.DateTimeFormat.call(obj);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Re-initializing object created with \"new\" as DateTimeFormat was not rejected.");
    } else if (error.name !== "TypeError") {
        $ERROR("Re-initializing object created with \"new\" as DateTimeFormat was rejected with wrong error " + error.name + ".");
    }
    
    // variant 2: use constructor as a function
    obj = Constructor.call({});
    error = undefined;
    try {
        Intl.DateTimeFormat.call(obj);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Re-initializing object created with constructor as function as DateTimeFormat was not rejected.");
    } else if (error.name !== "TypeError") {
        $ERROR("Re-initializing object created with constructor as function as DateTimeFormat was rejected with wrong error " + error.name + ".");
    }
    
    return true;
});

