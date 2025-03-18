//// [tests/cases/compiler/staticClassProps.ts] ////

//// [staticClassProps.ts]
class C
{
    public foo() {
        static z = 1;
    }
}



//// [staticClassProps.js]
class C {
    foo() {
    }
    static z = 1;
}
