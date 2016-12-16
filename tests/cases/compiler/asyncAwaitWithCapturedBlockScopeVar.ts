// @target: es5
// @lib: es6
// @noEmitHelpers: true
async function fn1() {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
    }
}

async function fn2() {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
        break;
    }
}

async function fn3() {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
        continue;
    }
}

async function fn4(): Promise<number> {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
        return 1;
    }
}
