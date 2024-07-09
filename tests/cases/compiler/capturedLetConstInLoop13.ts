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