//// [tests/cases/compiler/classNameReferencesInStaticElements.ts] ////

//// [classNameReferencesInStaticElements.ts]
// https://github.com/microsoft/TypeScript/issues/54607
class Foo {
    static { console.log(this, Foo) }
    static x = () => { console.log(this, Foo) }
    static y = function(this: unknown) { console.log(this, Foo) }

    #x() { console.log(Foo); }
    x() { this.#x(); }
}

const oldFoo = Foo;
(Foo as any) = null;
oldFoo.x();
oldFoo.y();
new oldFoo().x();

//// [classNameReferencesInStaticElements.js]
class Foo {
    static { console.log(this, Foo); }
    static x = () => { console.log(this, Foo); };
    static y = function () { console.log(this, Foo); };
    #x() { console.log(Foo); }
    x() { this.#x(); }
}
const oldFoo = Foo;
Foo = null;
oldFoo.x();
oldFoo.y();
new oldFoo().x();
