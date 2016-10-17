interface Gen {
    x: any;
}
function cloneAgain<T extends Gen>(t: T): T {
    let { x, ...rest } = t;
    return t;
}
