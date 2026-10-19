// @strict: true
function scale(value: number, factor: number) {
    if (value !== 0) {
        value *= -1;
        value *= factor;
    }
}
