//// [tests/cases/compiler/importAnImport.ts] ////

//// [importAnImport.ts]
namespace c.a.b {
    import ma = a;
}

namespace m0 {
    import m8 = c.a.b.ma;
}

//// [importAnImport.js]
