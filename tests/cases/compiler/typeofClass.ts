class K {
    foo: number;
    static bar: string;
}

declare var k1: K;
k1.foo;
k1.bar;
declare var k2: typeof K;
k2.foo;
k2.bar;