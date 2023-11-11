//// [tests/cases/compiler/enumWithExport.ts] ////

//// [enumWithExport.ts]
namespace x {
  export let y = 123
}
enum x {
  z = y
}

/// [Declarations] ////



//// [/.src/enumWithExport.d.ts]
declare namespace x {
    let y: number;
}
declare enum x {
    z
}
/// [Errors] ////

enumWithExport.ts(5,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumWithExport.ts(5,7): error TS2304: Cannot find name 'y'.


==== enumWithExport.ts (2 errors) ====
    namespace x {
      export let y = 123
    }
    enum x {
      z = y
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
          ~
!!! error TS2304: Cannot find name 'y'.
    }