//// [tests/cases/compiler/accessorWithRestParam.ts] ////

//// [accessorWithRestParam.ts]
class C {
    set X(...v) { }
    static set X(...v2) { }
}

//// [accessorWithRestParam.js]
class C {
    set X(...v) { }
    static set X(...v2) { }
}
