let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;
function stillMustBeLast({ ...mustBeLast, a }: { a: number, b: string }): void {
}
function generic<T extends { x, y }>(t: T) {
    let { x, ...rest } = t;
    return rest;
}
