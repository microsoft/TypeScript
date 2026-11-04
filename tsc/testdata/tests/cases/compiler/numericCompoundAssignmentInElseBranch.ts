// @strict: true
function accumulate(total: number, width: number, kernedWidth: number) {
    if (total === 0) {
        total += width;
    } else {
        total += kernedWidth;
    }
}
