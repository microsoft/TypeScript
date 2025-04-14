//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames3_ES6.ts] ////

//// [computedPropertyNames3_ES6.ts]
var id;
class C {
    [0 + 1]() { }
    static [() => { }]() { }
    get [delete id]() { }
    set [[0, 1]](v) { }
    static get [<String>""]() { }
    static set [id.toString()](v) { }
}

//// [computedPropertyNames3_ES6.js]
var id;
class C {
    [0 + 1]() { }
    static [() => { }]() { }
    get [delete id]() { }
    set [[0, 1]](v) { }
    static get [""]() { }
    static set [id.toString()](v) { }
}
