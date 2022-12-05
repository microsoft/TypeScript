// @strict: true, false

function foo(a?: boolean): void {
    a ??= true;

    if (a === false) {
        console.log(a);
    }
}

foo(false);
