//// [tests/cases/conformance/test262/language/literals/string/legacy-octal-escape-sequence-strict.ts] ////

//// [legacy-octal-escape-sequence-strict.ts]
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-template-literal-lexical-components
description: LegacyOctalEscapeSequence is not available in template literals
info: |
  TemplateCharacter ::
    $ [lookahead ≠ {]
    \ TemplateEscapeSequence
    \ NotEscapeSequence
    LineContinuation
    LineTerminatorSequence
    SourceCharacter but not one of ` or \ or $ or LineTerminator
  TemplateEscapeSequence ::
    CharacterEscapeSequence
    0 [lookahead ∁EDecimalDigit]
    HexEscapeSequence
    UnicodeEscapeSequence
flags: [onlyStrict]
negative:
  phase: parse
  type: SyntaxError
---*/


'\1';


//// [legacy-octal-escape-sequence-strict.js]
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-template-literal-lexical-components
description: LegacyOctalEscapeSequence is not available in template literals
info: |
  TemplateCharacter ::
    $ [lookahead ≠ {]
    \ TemplateEscapeSequence
    \ NotEscapeSequence
    LineContinuation
    LineTerminatorSequence
    SourceCharacter but not one of ` or \ or $ or LineTerminator
  TemplateEscapeSequence ::
    CharacterEscapeSequence
    0 [lookahead ∁EDecimalDigit]
    HexEscapeSequence
    UnicodeEscapeSequence
flags: [onlyStrict]
negative:
  phase: parse
  type: SyntaxError
---*/
'\1';
