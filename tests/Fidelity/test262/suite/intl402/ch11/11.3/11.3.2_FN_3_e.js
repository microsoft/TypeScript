// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.NumberFormat.prototype.format
 * supports all alternative numbering systems.
 * @author: Roozbeh Pournader
 */

var numberingSystems = {
    arab: 0x0660,
    arabext: 0x06F0,
    beng: 0x09E6,
    deva: 0x0966,
    fullwide: 0xFF10,
    gujr: 0x0AE6,
    guru: 0x0A66,
    hanidec: [0x3007, 0x4E00, 0x4E8C, 0x4E09, 0x56DB,
              0x4E94, 0x516D, 0x4E03, 0x516B, 0x4E5D],
    khmr: 0x17E0,
    knda: 0x0CE6,
    laoo: 0x0ED0,
    latn: 0x0030,
    mlym: 0x0D66,
    mong: 0x1810,
    mymr: 0x1040,
    orya: 0x0B66,
    tamldec: 0x0BE6,
    telu: 0x0C66,
    thai: 0x0E50,
    tibt: 0x0F20
};

var options, formatter;
var s, zeroCode, digitList;

for (s in numberingSystems) {
    zeroCode = numberingSystems[s];
    if (typeof zeroCode === 'number') {
        digitList = [zeroCode, zeroCode+1, zeroCode+2, zeroCode+3, zeroCode+4,
                   zeroCode+5, zeroCode+6, zeroCode+7, zeroCode+8, zeroCode+9];
        numberingSystems[s] = digitList;
    }
}

// FIXME: Unfinished

