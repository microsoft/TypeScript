//// [tests/cases/compiler/capturedLetConstInLoop13.ts] ////

//// [capturedLetConstInLoop13.ts]
class Main {

    constructor() {
        this.register("a", "b", "c");
    }

    private register(...names: string[]): void {
        for (let name of names) {

            this.bar({
                [name + ".a"]: () => { this.foo(name); },
            });
        }
    }

    private bar(a: any): void { }

    private foo(name: string): void { }

}

new Main();

//// [capturedLetConstInLoop13.js]
class Main {
    constructor() {
        this.register("a", "b", "c");
    }
    register(...names) {
        for (let name of names) {
            this.bar({
                [name + ".a"]: () => { this.foo(name); },
            });
        }
    }
    bar(a) { }
    foo(name) { }
}
new Main();
