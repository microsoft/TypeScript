// Repro from #11000

declare var cond: boolean;

function foo1() {
    let x: string | number | boolean = 0;
    while (cond) {
        if (typeof x === "string") {
            x = x.slice();
        }
        else {
            x = "abc";
        }
    }
}

function foo2() {
    let x: string | number | boolean = 0;
    while (cond) {
        if (typeof x === "number") {
            x = "abc";
        }
        else {
            x = x.slice();
        }
    }
}