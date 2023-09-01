// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: prod-RegularExpressionFirstChar
info: |
  RegularExpressionChars ::
    [empty]
    RegularExpressionCharsRegularExpressionChar

  RegularExpressionFirstChar ::
    RegularExpressionNonTerminator but not one of * or \ or / or [

description: >
  The first character of a regular expression may not be "*"
negative:
  phase: parse
  type: SyntaxError
---*/


/*/
