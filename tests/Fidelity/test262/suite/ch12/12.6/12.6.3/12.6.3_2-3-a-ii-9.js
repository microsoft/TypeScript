/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Refer 12.6.3; 
 * The production 
 *     IterationStatement : for ( var VariableDeclarationListNoIn ; Expressionopt ; Expressionopt ) Statement
 * is evaluated as follows:
 *
 * @path ch12/12.6/12.6.3/12.6.3_2-3-a-ii-9.js
 * @description The for Statement - (normal, V, empty) will be returned when first Expression is a String object (value is 'null')
 */


function testcase() {
        var accessed = false;
        var strObj = new String("null");
        for (var i = 0; strObj;) {
            accessed = true;
            break;
        }
        return accessed;
    }
runTestCase(testcase);
