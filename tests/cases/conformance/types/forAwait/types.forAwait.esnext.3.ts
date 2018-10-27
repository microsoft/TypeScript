// @target: es2018
// @lib: es5
// @noEmit: true
async function f1() {
    let y: number;
    for await (const x of {}) {
    }
    for await (y of {}) {
    }
}
async function* f2() {
    let y: number;
    for await (const x of {}) {
    }
    for await (y of {}) {
    }
}
