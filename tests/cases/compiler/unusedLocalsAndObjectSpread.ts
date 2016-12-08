//@noUnusedLocals:true

declare var console: { log(a: any): void };

function one() {
    const foo = { a: 1, b: 2 };
    // 'a' is declared but never used
    const {a, ...bar} = foo;
    console.log(bar);
}

function two() {
    const foo = { a: 1, b: 2 };
    // '_' is declared but never used
    const {a: _, ...bar} = foo;
    console.log(bar);
}

