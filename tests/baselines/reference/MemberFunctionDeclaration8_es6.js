//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration8_es6.ts] ////

//// [MemberFunctionDeclaration8_es6.ts]
class C {
  foo() {
    // Make sure we don't think of *bar as the start of a generator method.
    if (a) ¬ * bar;
    return bar;
  }
}

//// [MemberFunctionDeclaration8_es6.js]
class C {
    foo() {
        // Make sure we don't think of *bar as the start of a generator method.
        if (a)
            ;
         * bar;
        return bar;
    }
}
