// @strict: true
function createConsumer(count: number) {
    return () => {
        if (count === 0) return;
        count -= 1;
    };
}
