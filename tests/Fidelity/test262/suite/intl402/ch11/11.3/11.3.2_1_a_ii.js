// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.NumberFormat.prototype.format
 * converts other types to numbers.
 * @author: Roozbeh Pournader
 */

var formatter = new Intl.NumberFormat();
var testData = [undefined, null, true, '0.6666666'];
var number;
var i, input, correctResult, result;

for (i in testData) {
    input = testData[i];
    number = +input;
    correctResult = formatter.format(number);
    
    result = formatter.format(input);
    if (result !== correctResult) {
        $ERROR('Intl.NumberFormat does not convert other ' +
            'types to numbers. Input: "'+input+'" Output: "'+result+'" '+
            'Expected output: "'+correctResult+'"');
    }
}

