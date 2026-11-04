// @strict: true
function drain(count: number) {
    for (;;) {
        if (count === 0) break;
        count -= 1;
    }
}
