//// [tests/cases/compiler/jsFileCompilationOptionalClassElementSyntaxOfClass.ts] ////

//// [a.js]
class C {
    foo?() {
    }
    bar? = 1; 
}

//// [a.js]
class C {
    foo() {
    }
    bar = 1;
}
