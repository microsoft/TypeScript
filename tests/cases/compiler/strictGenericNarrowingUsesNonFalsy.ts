// @strict: true
function f<T extends { x?: number }>(o: Readonly<T>) {
    if (o.x) {
        o.x.toExponential(); // Hover over 'x' shows number
        const n: number = o.x; // Error. Hover over 'x' shows `T["x"]`
    }
}
