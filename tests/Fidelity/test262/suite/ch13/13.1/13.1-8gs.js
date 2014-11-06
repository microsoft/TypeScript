/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.1/13.1-8gs.js
 * @description Strict Mode - SyntaxError is thrown if a FunctionExpression has two identical parameters
 * @onlyStrict
 * @negative ^((?!NotEarlyError).)*$
 */
"use strict";
throw NotEarlyError;
var _13_1_8_fun = function (param, param) { };