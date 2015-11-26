// @target: ES6
class A {
    foo() {
        for (let x of [0]) {
            let f = function() { return x; };
            this.bar(f());
        }
    }
    bar(a: number) {
    }

    baz() {
        for (let x of [1]) {
            let a = function() {  return x; };
            for (let y of [1]) {
                let b = function() { return y; };
                this.bar(b());
            }
            this.bar(a());
        }
    }
    baz2() {
        for (let x of [1]) {
            let a = function() {  return x; };
            this.bar(a());
            for (let y of [1]) {
                let b = function() { return y; };
                this.bar(b());
            }
        }
    }
}

class B {
    foo() {
        let a =
            () => {
                for (let x of [0]) {
                    let f = () => x;
                    this.bar(f());
                }
            }
    }
    bar(a: number) {
    }
}