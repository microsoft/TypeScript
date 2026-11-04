// @strict: true

function ease(value: number, divisor: number) {
    if (value === 0) return 0;
    value /= divisor;
    if (value === 2) return 2;
    return Math.pow(2, -10 * (value -= 1));
}
