//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic4.ts] ////

//// [parserAccessibilityAfterStatic4.ts]
class Outer
{
static public: number;
}


//// [parserAccessibilityAfterStatic4.js]
"use strict";
class Outer {
    static public;
}
