// @declaration: true
// @strict: true
// @target: es5

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
    z?: number;
    moveBy(dx: number, dy: number, dz?: number): void;
}

let p1: Point = {
    x: 10,
    y: 20,
    moveBy(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        if (this.z && dz) {
            this.z += dz;
        }
    }
};

let p2: Point | null = {
    x: 10,
    y: 20,
    moveBy(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        if (this.z && dz) {
            this.z += dz;
        }
    }
};

let p3: Point | undefined = {
    x: 10,
    y: 20,
    moveBy(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        if (this.z && dz) {
            this.z += dz;
        }
    }
};

let p4: Point | null | undefined = {
    x: 10,
    y: 20,
    moveBy(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        if (this.z && dz) {
            this.z += dz;
        }
    }
};

declare function f1(p: Point): void;

f1({
    x: 10,
    y: 20,
    moveBy(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        if (this.z && dz) {
            this.z += dz;
        }
    }
});

declare function f2(p: Point | null | undefined): void;

f2({
    x: 10,
    y: 20,
    moveBy(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        if (this.z && dz) {
            this.z += dz;
        }
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

// Check pattern similar to Object.defineProperty and Object.defineProperties

type PropDesc<T> = {
    value?: T;
    get?(): T;
    set?(value: T): void;
}

type PropDescMap<T> = {
    [K in keyof T]: PropDesc<T[K]>;
}

declare function defineProp<T, K extends string, U>(obj: T, name: K, desc: PropDesc<U> & ThisType<T>): T & Record<K, U>;

declare function defineProps<T, U>(obj: T, descs: PropDescMap<U> & ThisType<T>): T & U;

let p10 = defineProp(p1, "foo", { value: 42 });
p10.foo = p10.foo + 1;

let p11 = defineProp(p1, "bar", {
    get() {
        return this.x;
    },
    set(value: number) {
        this.x = value;
    }
});
p11.bar = p11.bar + 1;

let p12 = defineProps(p1, {
    foo: {
        value: 42
    },
    bar: {
        get(): number {
            return this.x;
        },
        set(value: number) {
            this.x = value;
        }
    }
});
p12.foo = p12.foo + 1;
p12.bar = p12.bar + 1;

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
