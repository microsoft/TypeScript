// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3667

// When this.xxx assignment declarations are present in constructor, the declared type of the
// property is determined from CFA to the point of exit of the constructor.

// @filename: main.js

class C1 {
    constructor() {
        this.foo = [3];
        this.foo = [this.foo[0] * 2];
        this.foo;  // number[]
    }
}

class C2 {
    constructor() {
        this.foo = [3];
        this.foo;  // number[]
    }
    method1() {
        this.foo = [this.foo[0] * 2];
    }
}

class C4 {
    constructor() {
        this.bar = [];
        this.bar.push("baz");
        this.bar;  // string[]
    }
}

// When this.xxx assignment declarations occur only in methods, the declared type of the
// property is a union of the types of all assigned values, excluding values from self-referential
// assignments, plus undefined. Local CFA removes the undefined when possible.

class C5 {
    method1() {
        this.foo;  // number[] | undefined
        this.foo = [3]
        this.foo = [this.foo[0] * 2]
        this.foo;  // number[]
    }
}

class C6 {
    method1() {
        this.foo = [3];
        this.foo;  // number[]
    }
    method2() {
        this.foo;  // number[] | undefined
        this.foo = [this.foo[0] * 2];  // Error: Object is possibly undefined
        this.foo;  // number[]
    }
}

class C7 {
    method1() {
        this.foo = 0;
        this.foo = this.foo + "abc";  // Error, 'string' not assignable to 'number'
    }
}

// When this.xxx assigmment declarations occur only in methods, an assigned empty array
// literal value is given type 'any[]'.

class C8 {
    method1() {
        this.bar = [];  // Error: Implicit any[]
        this.bar.push("baz");
        this.bar;  // any[]
    }    
}
