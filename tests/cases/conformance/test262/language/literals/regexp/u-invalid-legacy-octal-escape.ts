// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-patterns
es6id: 21.2.1
description: Legacy Octal Escape Sequence not supported with `u` flag
info: |
    The `u` flag precludes the use of LegacyOctalEscapeSequence irrespective
    of the presence of Annex B extensions.

    CharacterEscape [U] ::
        ControlEscape
        c ControlLetter
        0[lookahead ∁EDecimalDigit]
        HexEscapeSequence
        RegExpUnicodeEscapeSequence[?U]
        IdentityEscape[?U]
negative:
  phase: parse
  type: SyntaxError
---*/


/\1/u;
