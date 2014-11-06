/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.

/**
 * @path ch12/12.10/12.10.1/12.10.1-11gs.js
 * @description Strict Mode - SyntaxError is thrown when using with statement
 * @onlyStrict
 * @negative ^((?!NotEarlyError).)*$
 */

"use strict";
throw NotEarlyError;
with ({}) { }
