//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames17_ES5.ts] ////

//// [computedPropertyNames17_ES5.ts]
var b: boolean;
class C {
    get [b]() { return 0;}
    static set [true](v) { }
    get [[]]() { return 0; }
    set [{}](v) { }
    static get [undefined]() { return 0; }
    set [null](v) { }
}

//// [computedPropertyNames17_ES5.js]
var b;
class C {
    get [b]() { return 0; }
    static set [true](v) { }
    get [[]]() { return 0; }
    set [{}](v) { }
    static get [undefined]() { return 0; }
    set [null](v) { }
}
