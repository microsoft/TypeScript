// @target: es2015, esnext

class Foo {
    m() {}
}

const foo = new Foo();

(foo.m as any)?.();
(<any>foo.m)?.();

/*a1*/(/*a2*/foo.m as any/*a3*/)/*a4*/?.();
/*b1*/(/*b2*/<any>foo.m/*b3*/)/*b4*/?.();

// https://github.com/microsoft/TypeScript/issues/50148
(foo?.m as any).length;
(<any>foo?.m).length;
(foo?.["m"] as any).length;
(<any>foo?.["m"]).length;