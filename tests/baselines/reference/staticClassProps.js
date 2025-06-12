//// [tests/cases/compiler/staticClassProps.ts] ////

//// [staticClassProps.ts]
class C
{
    public foo() {
        static z = 1;
    }
}



//// [staticClassProps.js]
let C = (() => {
    class C {
        foo() {
        }
    }
    C.z = 1;
    return C;
})();
