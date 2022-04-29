//// [errorMessagesIntersectionTypes03.ts]
interface A {
    a;
}

interface B {
    b;
}

function f<T, U extends A, V extends U>(): void {
    let t: T;
    let u: U;
    let v: V;

    let a_and_b: A & B;
    let t_and_b: T & B;

    t = a_and_b;
    u = a_and_b;
    v = a_and_b;

    t = t_and_b;
    u = t_and_b;
    v = t_and_b;
}

//// [errorMessagesIntersectionTypes03.js]
function f() {
    var t;
    var u;
    var v;
    var a_and_b;
    var t_and_b;
    t = a_and_b;
    u = a_and_b;
    v = a_and_b;
    t = t_and_b;
    u = t_and_b;
    v = t_and_b;
}
