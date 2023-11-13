//// [tests/cases/compiler/enumWithExport.ts] ////

//// [enumWithExport.ts]
namespace x {
  export let y = 123
}
enum x {
  z = y
}

/// [Declarations] ////



//// [enumWithExport.d.ts]
declare namespace x {
    let y: number;
}
declare enum x {
    z
}
/// [Errors] ////

enumWithExport.ts(5,7): error TS2304: Cannot find name 'y'.


==== enumWithExport.ts (1 errors) ====
    namespace x {
      export let y = 123
    }
    enum x {
      z = y
          ~
!!! error TS2304: Cannot find name 'y'.
    }