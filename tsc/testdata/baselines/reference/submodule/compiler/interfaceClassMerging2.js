//// [tests/cases/compiler/interfaceClassMerging2.ts] ////

//// [interfaceClassMerging2.ts]
interface Foo {
    interfaceFooMethod(): this;
    interfaceFooProperty: this;
}

class Foo {
    classFooProperty: this;

    classFooMethod(): this {
        return this;
    }
}


interface Bar {
    interfaceBarMethod(): this;
    interfaceBarProperty: this;
}

class Bar extends Foo {
    classBarProperty: this;

    classBarMethod(): this {
        return this;
    }
}


var bar = new Bar();
bar.interfaceBarMethod().interfaceFooMethod().classBarMethod().classFooMethod();


var foo = new Foo();

foo = bar;


//// [interfaceClassMerging2.js]
class Foo {
    classFooProperty;
    classFooMethod() {
        return this;
    }
}
class Bar extends Foo {
    classBarProperty;
    classBarMethod() {
        return this;
    }
}
var bar = new Bar();
bar.interfaceBarMethod().interfaceFooMethod().classBarMethod().classFooMethod();
var foo = new Foo();
foo = bar;
