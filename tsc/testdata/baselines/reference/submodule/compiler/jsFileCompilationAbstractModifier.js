//// [tests/cases/compiler/jsFileCompilationAbstractModifier.ts] ////

//// [a.js]
abstract class c {
    abstract x;
}

//// [a.js]
class c {
    x;
}
