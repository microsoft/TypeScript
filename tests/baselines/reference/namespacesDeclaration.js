//// [namespacesDeclaration.ts]

module M {
   export namespace N {
      export module M2 {
         export interface I {}
      }
   }
}

//// [namespacesDeclaration.js]


//// [namespacesDeclaration.d.ts]
declare module M {
    namespace N {
        module M2 {
            interface I {
            }
        }
    }
}
