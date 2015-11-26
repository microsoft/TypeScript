// doc 2.4
// Static members are declared using the static modifier and are members of the constructor function type.

module NonGeneric {
    struct C {
        fn() { return this; }
        constructor(public a: number, private b: number) { }
        static foo: string; // not reflected in struct type
    }

    module C {
        export var bar = ''; // not reflected in struct type
    }

    var c = new C(1, 2);
    var r = c.fn();
    var r4 = c.foo; // error
    var r5 = c.bar; // error

	var cs: typeof C;
	r = cs.fn(); // error
	r4 = cs.foo; // ok
	r5 = cs.bar; // ok
}

/* module Generic {
    struct C<T, U> {
        fn() { return this; }
        constructor(public a: T, private b: U) { }
        static foo: T; // not reflected in struct type
    }

    module C {
        export var bar = ''; // not reflected in struct type
    }

    var c = new C(1, '');
    var r = c.fn();
    var r4 = c.foo; // error
    var r5 = c.bar; // error
} */