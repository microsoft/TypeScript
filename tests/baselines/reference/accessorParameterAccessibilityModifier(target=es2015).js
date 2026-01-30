//// [tests/cases/compiler/accessorParameterAccessibilityModifier.ts] ////

//// [accessorParameterAccessibilityModifier.ts]
class C {
    set X(public v) { }
    static set X(public v2) { }
}

//// [accessorParameterAccessibilityModifier.js]
class C {
    set X(v) { }
    static set X(v2) { }
}
