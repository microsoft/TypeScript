//// [tests/cases/conformance/test262/language/literals/regexp/S7.8.5_A2.2_T2.ts] ////

//// [S7.8.5_A2.2_T2.ts]
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
  A regular expression may not contain a "/" as a SourceCharacter

negative:
  phase: parse
  type: SyntaxError
---*/


/a//.source;


//// [S7.8.5_A2.2_T2.js]
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
  A regular expression may not contain a "/" as a SourceCharacter

negative:
  phase: parse
  type: SyntaxError
---*/
/a/ / .source;
