//// [tests/cases/compiler/namespacesDeclaration1.ts] ////

//// [namespacesDeclaration1.ts]
namespace M {
   export namespace N {
      export namespace M2 {
         export interface I {}
      }
   }
}

//// [namespacesDeclaration1.js]


//// [namespacesDeclaration1.d.ts]
declare namespace M {
    namespace N {
        namespace M2 {
            interface I {
            }
        }
    }
}
