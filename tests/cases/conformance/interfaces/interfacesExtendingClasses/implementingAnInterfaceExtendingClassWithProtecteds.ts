class Foo {
    protected x: string;
}

interface I extends Foo {
    y: number;
}

class Bar implements I { // error
}

class Bar2 implements I { // error
    y: number;
}

class Bar3 implements I { // error
    x: string;
    y: number;
}

class Bar4 implements I { // error
    protected x: string;
    y: number;
}

class Bar5 extends Foo implements I { // error
}

class Bar6 extends Foo implements I { // error
    protected y: number;
}

class Bar7 extends Foo implements I {
    y: number;
}

class Bar8 extends Foo implements I {
    x: string;
    y: number;
}
