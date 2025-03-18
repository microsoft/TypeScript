//// [tests/cases/conformance/classes/members/privateNames/privateNameSetterExprReturnValue.ts] ////

//// [privateNameSetterExprReturnValue.ts]
class C {
    set #foo(a: number) {}
    bar() {
        let x = (this.#foo = 42 * 2);
        console.log(x); // 84
    }
}

new C().bar();


//// [privateNameSetterExprReturnValue.js]
class C {
    set #foo(a) { }
    bar() {
        let x = (this.#foo = 42 * 2);
        console.log(x);
    }
}
new C().bar();
