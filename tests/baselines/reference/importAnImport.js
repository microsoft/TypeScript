//// [tests/cases/compiler/importAnImport.ts] ////

//// [importAnImport.ts]
module c.a.b {
    import ma = a;
}

module m0 {
    import m8 = c.a.b.ma;
}

//// [importAnImport.js]
