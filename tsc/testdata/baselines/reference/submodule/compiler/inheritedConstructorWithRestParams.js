//// [tests/cases/compiler/inheritedConstructorWithRestParams.ts] ////

//// [inheritedConstructorWithRestParams.ts]
class Base {
    constructor(...a: string[]) { }
}

class Derived extends Base { }

// Ok
new Derived("", "");
new Derived("");
new Derived();

// Errors
new Derived("", 3);
new Derived(3);

//// [inheritedConstructorWithRestParams.js]
class Base {
    constructor(...a) { }
}
class Derived extends Base {
}
new Derived("", "");
new Derived("");
new Derived();
new Derived("", 3);
new Derived(3);
