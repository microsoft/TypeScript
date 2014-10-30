/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.

/**
 * @path ch07/7.8/7.8.5/7.8.5-1gs.js
 * @description Empty literal RegExp should result in a SyntaxError
 * @negative ^((?!NotEarlyError).)*$
 */

throw NotEarlyError;
var re = //;

