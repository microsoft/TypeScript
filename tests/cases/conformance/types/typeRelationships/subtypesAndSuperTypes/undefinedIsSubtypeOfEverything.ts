// undefined is a subtype of every other types, no errors expected below

class Base {
    foo: typeof undefined;
} 

class D0 extends Base {
    foo: any;
}

class DA extends Base {
    foo: typeof undefined; 
}

class D1 extends Base {
    foo: string;
}

class D1A extends Base {
    foo: String;
}


class D2 extends Base {
    foo: number;
}

class D2A extends Base {
    foo: Number;
}


class D3 extends Base {
    foo: boolean;
}

class D3A extends Base {
    foo: Boolean;
}


class D4 extends Base {
    foo: RegExp;
}

class D5 extends Base {
    foo: Date;
}


class D6 extends Base {
    foo: number[];
}

class D7 extends Base {
    foo: { bar: number };
}


class D8 extends Base {
    foo: D7;
}

interface I1 {
    bar: string;
}
class D9 extends Base {
    foo: I1;
}


class D10 extends Base {
    foo: () => number;
}

enum E { A }
class D11 extends Base {
    foo: E;
}

function f() { }
module f {
    export var bar = 1;
}
class D12 extends Base {
    foo: typeof f;
}


class c { baz: string }
module c {
    export var bar = 1;
}
class D13 extends Base {
    foo: typeof c;
}


class D14<T> extends Base {
    foo: T;
}


class D15<T, U> extends Base {
    foo: U;
}

//class D15<T, U extends T> extends Base {
//    foo: U;
//}


class D16 extends Base {
    foo: Object;
}


class D17 extends Base {
    foo: {};
}
