//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldNoInitializer.ts] ////

//// [privateNameStaticFieldNoInitializer.ts]
const C = class {
    static #x;
}

class C2 {
    static #x;
}


//// [privateNameStaticFieldNoInitializer.js]
const C = class {
    static #x;
};
class C2 {
    static #x;
}
