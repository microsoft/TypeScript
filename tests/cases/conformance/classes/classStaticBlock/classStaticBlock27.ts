// https://github.com/microsoft/TypeScript/issues/44872

void class Foo {
    static prop = 1
    static {
        console.log(Foo.prop);
        Foo.prop++;
    }
    static {
        console.log(Foo.prop);
        Foo.prop++;
    }
    static {
        console.log(Foo.prop);
        Foo.prop++;
    }
}