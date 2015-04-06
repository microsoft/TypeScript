//// [computedPropertyNames14_ES6.ts]
var b: boolean;
class C {
    [b]() {}
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}

//// [computedPropertyNames14_ES6.js]
var b;
class C {
    [b]() { }
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}
