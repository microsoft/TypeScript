// @lib: es2020
// @module: es2020
// @target: es2020
// @filename: 0.ts
export class B {
    print() { return "I am B"}
}

export function foo() { return "foo" }

// @filename: 1.ts
export function backup() { return "backup"; }

// @filename: 2.ts
declare var console: any;
class C {
    private myModule = import("./0");
    method() {
        const loadAsync = import ("./0");
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async err => {
            console.log(err);
            let one = await import("./1");
            console.log(one.backup());
        });
    }
}
