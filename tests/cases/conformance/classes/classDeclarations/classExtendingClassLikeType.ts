interface Base<T, U> {
    x: T;
    y: U;
}

// Error, no Base constructor function
class D0 extends Base<string, string> {
}

interface BaseConstructor {
    new (x: string, y: string): Base<string, string>;
    new <T>(x: T): Base<T, T>;
    new <T>(x: T, y: T): Base<T, T>;
    new <T, U>(x: T, y: U): Base<T, U>;
}

declare function getBase(): BaseConstructor;

class D1 extends getBase() {
    constructor() {
        super("abc", "def");
        this.x = "x";
        this.y = "y";
    }
}

class D2 extends getBase() <number> {
    constructor() {
        super(10);
        super(10, 20);
        this.x = 1;
        this.y = 2;
    }
}

class D3 extends getBase() <string, number> {
    constructor() {
        super("abc", 42);
        this.x = "x";
        this.y = 2;
    }
}

// Error, no constructors with three type arguments
class D4 extends getBase() <string, string, string> {
}

interface BadBaseConstructor {
    new (x: string): Base<string, string>;
    new (x: number): Base<number, number>;
}

declare function getBadBase(): BadBaseConstructor;

// Error, constructor return types differ
class D5 extends getBadBase() {
}
