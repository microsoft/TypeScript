//// [namespacesDeclaration1.ts]
module M {
   export namespace N {
      export module M2 {
         export interface I {}
      }
   }
}

//// [namespacesDeclaration1.js]


//// [namespacesDeclaration1.d.ts]
declare module M {
    namespace N {
        module M2 {
            interface I {
            }
        }
    }
}
