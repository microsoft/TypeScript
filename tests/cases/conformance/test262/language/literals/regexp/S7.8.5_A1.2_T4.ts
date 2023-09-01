// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-literals-regular-expression-literals
info: |
  RegularExpressionLiteral::
    / RegularExpressionBody / RegularExpressionFlags

  RegularExpressionBody ::
    RegularExpressionFirstChar RegularExpressionChars

  RegularExpressionChars::
    [empty]

  MemberExpression . IdentifierName

description: A regular expression may not be empty.
negative:
  phase: parse
  type: SyntaxError
---*/


//
.source;
