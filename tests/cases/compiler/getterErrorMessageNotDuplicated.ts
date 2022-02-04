interface Thing {
    get style(): Foo;
    set style(cssText: string | Bar);
}

interface Foo {
    hello: string;
    world: number;
}

interface Bar extends Foo {
    extra: any;
}