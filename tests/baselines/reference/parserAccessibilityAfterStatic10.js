//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic10.ts] ////

//// [parserAccessibilityAfterStatic10.ts]
class Outer
{
static public intI<T>() {}
}


//// [parserAccessibilityAfterStatic10.js]
class Outer {
    static intI() { }
}
