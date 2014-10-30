/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.2/13.2-19-b-3gs.js
 * @description StrictMode - error is thrown when assign a value to the 'caller' property of a function object
 * @onlyStrict
 * @negative NotEarlyError
 */
"use strict";
throw NotEarlyError;
function _13_2_19_b_3_gs() {}
_13_2_19_b_3_gs.caller = 1;
