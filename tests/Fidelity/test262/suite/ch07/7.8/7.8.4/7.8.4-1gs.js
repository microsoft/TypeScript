/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.8/7.8.4/7.8.4-1gs.js
 * @description Strict Mode - OctalEscapeSequence(\0110) is forbidden in strict mode
 * @onlyStrict
 * @negative ^((?!NotEarlyError).)*$
 */
﻿"use strict";
throw NotEarlyError;
var _7_8_4_2 = '100abc\0110def';