// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: prod-RegularExpressionChar
info: |
  RegularExpressionChar ::
    RegularExpressionNonTerminator but not one of \ or / or [

  RegularExpressionNonTerminator ::
    SourceCharacter but not LineTerminator

description: >
  A regular express may not contain a "\" as a SourceCharacter

negative:
  phase: parse
  type: SyntaxError
---*/


/a\/
