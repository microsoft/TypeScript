// @strict: true
function shift(bitmap: number) {
    for (let index = 0; bitmap !== 0; index++, bitmap >>>= 1) {}
}
