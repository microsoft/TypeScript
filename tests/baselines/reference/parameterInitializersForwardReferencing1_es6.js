//// [parameterInitializersForwardReferencing1_es6.ts]
let foo: string = "";

function f1 (bar = foo) { // unexpected compiler error; works at runtime
    var foo: number = 2;
    return bar; // returns 1
}

function f2 (bar = (baz = foo) => baz) { // unexpected compiler error; works at runtime
    var foo: number = 2;
    return bar(); // returns 1
}

function f3 (bar = foo, foo = 2) { // correct compiler error, error at runtime
    return bar;
}

function f4 (foo, bar = foo) {
    return bar
}

function f5 (a = a) {
    return a
}

function f6 (async = async) {
    return async
}

function f7({[foo]: bar}: any[]) {
    let foo: number = 2;
}


//// [parameterInitializersForwardReferencing1_es6.js]
let foo = "";
function f1(bar = foo) {
    var foo = 2;
    return bar; // returns 1
}
function f2(bar = (baz = foo) => baz) {
    var foo = 2;
    return bar(); // returns 1
}
function f3(bar = foo, foo = 2) {
    return bar;
}
function f4(foo, bar = foo) {
    return bar;
}
function f5(a = a) {
    return a;
}
function f6(async = async) {
    return async;
}
function f7({ [foo]: bar }) {
    let foo = 2;
}
