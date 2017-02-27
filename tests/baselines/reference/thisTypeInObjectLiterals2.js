//// [thisTypeInObjectLiterals2.ts]

// In methods of an object literal with no contextual type, 'this' has the type
// of the object literal.

let obj1 = {
    a: 1,
    f() {
        return this.a;
    },
    b: "hello",
    c: {
        g() {
            this.g();
        }
    },
    get d() {
        return this.a;
    },
    get e() {
        return this.b;
    },
    set e(value) {
        this.b = value;
    }
};

// In methods of an object literal with a contextual type, 'this' has the
// contextual type.

type Point = {
    x: number;
    y: number;
    moveBy(dx: number, dy: number): void;
}

let p1: Point = {
    x: 10,
    y: 20,
    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};

declare function f1(p: Point): void;

f1({
    x: 10,
    y: 20,
    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
});

// In methods of an object literal with a contextual type that includes some
// ThisType<T>, 'this' is of type T.

type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>;  // Type of 'this' in methods is D & M
}

declare function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M;

let x1 = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx;  // Strongly typed this
            this.y += dy;  // Strongly typed this
        }
    }
});

// In methods contained in an object literal with a contextual type that includes
// some ThisType<T>, 'this' is of type T.

type ObjectDescriptor2<D, M> = ThisType<D & M> & {
    data?: D;
    methods?: M;
}

declare function makeObject2<D, M>(desc: ObjectDescriptor<D, M>): D & M;

let x2 = makeObject2({
    data: { x: 0, y: 0 },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx;  // Strongly typed this
            this.y += dy;  // Strongly typed this
        }
    }
});

// Proof of concept for typing of Vue.js

type Accessors<T> = { [K in keyof T]: (() => T[K]) | Computed<T[K]> };

type Dictionary<T> = { [x: string]: T }

type Computed<T> = {
    get?(): T;
    set?(value: T): void;
}

type VueOptions<D, M, P> = ThisType<D & M & P> & {
    data?: D | (() => D);
    methods?: M;
    computed?: Accessors<P>;
}

declare const Vue: new <D, M, P>(options: VueOptions<D, M, P>) => D & M & P;

let vue = new Vue({
    data: () => ({ x: 1, y: 2 }),
    methods: {
        f(x: string) {
            return this.x;
        }
    },
    computed: {
        test(): number {
            return this.x;
        },
        hello: {
            get() {
                return "hi";
            },
            set(value: string) {
            }
        }
    }
});

vue;
vue.x;
vue.f("abc");
vue.test;
vue.hello;


//// [thisTypeInObjectLiterals2.js]
// In methods of an object literal with no contextual type, 'this' has the type
// of the object literal.
var obj1 = {
    a: 1,
    f: function () {
        return this.a;
    },
    b: "hello",
    c: {
        g: function () {
            this.g();
        }
    },
    get d() {
        return this.a;
    },
    get e() {
        return this.b;
    },
    set e(value) {
        this.b = value;
    }
};
var p1 = {
    x: 10,
    y: 20,
    moveBy: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};
f1({
    x: 10,
    y: 20,
    moveBy: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
});
var x1 = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy: function (dx, dy) {
            this.x += dx; // Strongly typed this
            this.y += dy; // Strongly typed this
        }
    }
});
var x2 = makeObject2({
    data: { x: 0, y: 0 },
    methods: {
        moveBy: function (dx, dy) {
            this.x += dx; // Strongly typed this
            this.y += dy; // Strongly typed this
        }
    }
});
var vue = new Vue({
    data: function () { return ({ x: 1, y: 2 }); },
    methods: {
        f: function (x) {
            return this.x;
        }
    },
    computed: {
        test: function () {
            return this.x;
        },
        hello: {
            get: function () {
                return "hi";
            },
            set: function (value) {
            }
        }
    }
});
vue;
vue.x;
vue.f("abc");
vue.test;
vue.hello;


//// [thisTypeInObjectLiterals2.d.ts]
declare let obj1: {
    a: number;
    f(): number;
    b: string;
    c: {
        g(): void;
    };
    readonly d: number;
    e: string;
};
declare type Point = {
    x: number;
    y: number;
    moveBy(dx: number, dy: number): void;
};
declare let p1: Point;
declare function f1(p: Point): void;
declare type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>;
};
declare function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M;
declare let x1: {
    x: number;
    y: number;
} & {
    moveBy(dx: number, dy: number): void;
};
declare type ObjectDescriptor2<D, M> = ThisType<D & M> & {
    data?: D;
    methods?: M;
};
declare function makeObject2<D, M>(desc: ObjectDescriptor<D, M>): D & M;
declare let x2: {
    x: number;
    y: number;
} & {
    moveBy(dx: number, dy: number): void;
};
declare type Accessors<T> = {
    [K in keyof T]: (() => T[K]) | Computed<T[K]>;
};
declare type Dictionary<T> = {
    [x: string]: T;
};
declare type Computed<T> = {
    get?(): T;
    set?(value: T): void;
};
declare type VueOptions<D, M, P> = ThisType<D & M & P> & {
    data?: D | (() => D);
    methods?: M;
    computed?: Accessors<P>;
};
declare const Vue: new <D, M, P>(options: VueOptions<D, M, P>) => D & M & P;
declare let vue: {
    x: number;
    y: number;
} & {
    f(x: string): number;
} & {
    test: number;
    hello: string;
};
