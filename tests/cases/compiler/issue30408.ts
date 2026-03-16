// @strict: true

function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        continue loopend;
    }

    loopend:
    console.log('end of loop');
}

function bar() {
    continue loopend;
}
