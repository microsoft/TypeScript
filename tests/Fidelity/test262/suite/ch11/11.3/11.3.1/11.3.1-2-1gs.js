/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.

/**
 * @path ch11/11.3/11.3.1/11.3.1-2-1gs.js
 * @description Strict Mode - SyntaxError is throw if the identifier arguments appear as a PostfixExpression(arguments++)
 * @onlyStrict
 * @negative ^((?!NotEarlyError).)*$
 */

"use strict";
throw NotEarlyError;
arguments++;
