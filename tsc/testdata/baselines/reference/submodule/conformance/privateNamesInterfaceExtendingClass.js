//// [tests/cases/conformance/classes/members/privateNames/privateNamesInterfaceExtendingClass.ts] ////

//// [privateNamesInterfaceExtendingClass.ts]
class C {
    #prop;
    func(x: I) {
        x.#prop = 123;
    }
}
interface I extends C {}

function func(x: I) {
    x.#prop = 123;
}



//// [privateNamesInterfaceExtendingClass.js]
class C {
    #prop;
    func(x) {
        x.#prop = 123;
    }
}
function func(x) {
    x.#prop = 123;
}
