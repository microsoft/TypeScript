//// [tests/cases/compiler/enumBasics3.ts] ////

//// [enumBasics3.ts]
module M {
  export namespace N {
    export enum E1 {
      a = 1,
      b = a.a, // should error
    }
  }
}

module M {
  export namespace N {
    export enum E2 {
      b = M.N.E1.a,
      c = M.N.E1.a.a, // should error
    }
  }
}


/// [Declarations] ////



//// [enumBasics3.d.ts]
declare namespace M {
    namespace N {
        enum E1 {
            a = 1,
            b
        }
    }
}
declare namespace M {
    namespace N {
        enum E2 {
            b = 1,
            c
        }
    }
}
/// [Errors] ////

enumBasics3.ts(5,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics3.ts(5,13): error TS2339: Property 'a' does not exist on type 'E1.a'.
enumBasics3.ts(13,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics3.ts(14,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics3.ts(14,20): error TS2339: Property 'a' does not exist on type 'E1.a'.


==== enumBasics3.ts (5 errors) ====
    module M {
      export namespace N {
        export enum E1 {
          a = 1,
          b = a.a, // should error
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~
!!! error TS2339: Property 'a' does not exist on type 'E1.a'.
        }
      }
    }
    
    module M {
      export namespace N {
        export enum E2 {
          b = M.N.E1.a,
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
          c = M.N.E1.a.a, // should error
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~
!!! error TS2339: Property 'a' does not exist on type 'E1.a'.
        }
      }
    }
    