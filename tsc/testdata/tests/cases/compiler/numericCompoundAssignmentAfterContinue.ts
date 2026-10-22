// @strict: true
function consume(count: number) {
    for (;;) {
        if (count === 0) continue;
        count -= 1;
    }
}
