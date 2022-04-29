//// [funduleExportedClassIsUsedBeforeDeclaration.ts]
interface A {   // interface before module declaration
    (): B.C;    // uses defined below class in module
}
declare function B(): B.C;  // function merged with module
declare module B {
    export class C {    // class defined in module 
    }
}
new B.C(); 

//// [funduleExportedClassIsUsedBeforeDeclaration.js]
new B.C();
