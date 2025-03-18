//// [tests/cases/compiler/ClassDeclarationWithInvalidConstOnPropertyDeclaration.ts] ////

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.ts]
class AtomicNumbers {
  static const H = 1;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.js]
class AtomicNumbers {
    static H = 1;
}
