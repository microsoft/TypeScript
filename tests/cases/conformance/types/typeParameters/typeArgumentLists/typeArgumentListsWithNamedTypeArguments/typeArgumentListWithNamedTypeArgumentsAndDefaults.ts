class Foo<A extends {x: string} = {x: string, y: number}, B = number> {
    constructor(public a?: A, public b?: B) {}
}

const x = new Foo<B = string>();
x.a.x;
x.a.y;
x.b;
