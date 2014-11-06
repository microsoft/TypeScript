/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.4/11.4.1/11.4.1-5-a-5gs.js
 * @description Strict Mode - SyntaxError is thrown when deleting a variable which is primitive type(boolean)
 * @onlyStrict
 * @negative ^((?!NotEarlyError).)*$
 */
"use strict";
var _11_4_1_5 = 7;
throw NotEarlyError;
delete _11_4_1_5;