// @strictNullChecks: true

function f() {
    const x: string | null = <any>{};
    if (x !== null) {
        return {
            bar() { return x.length; }  // Error: possibly null x
        };
    }
}

function f2() {
    const x: string | null = <any>{};
    if (x !== null) {
        return class {
            bar() { return x.length; }  // Error: possibly null x
        };
    }
}