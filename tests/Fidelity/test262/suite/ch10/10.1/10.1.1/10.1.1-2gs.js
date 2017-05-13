/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.

/**
 * @path ch10/10.1/10.1.1/10.1.1-2gs.js
 * @description Strict Mode - Use Strict Directive Prologue is ''use strict'' which lost the last character ';'
 * @noStrict
 * @negative ^((?!NotEarlyError).)*$
 */

"use strict"
throw NotEarlyError;
var public = 1;
