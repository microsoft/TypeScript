//// [tests/cases/compiler/genericConstraintDeclaration.ts] ////

//// [genericConstraintDeclaration.ts]
class List<T extends {}>{
    static empty<T extends {}>(): List<T>{return null;}
}






//// [genericConstraintDeclaration.js]
class List {
    static empty() { return null; }
}
