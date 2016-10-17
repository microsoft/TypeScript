interface Gen {
    x: any;
}
interface Gen2 {
    parent: Gen;
    millenial: any;
}
function cloneAgain<T extends Gen & Gen2>(t: T): T {
    let y: Gen;
    let rest: T - Gen;
    let rest1: T - Gen - Gen2;
    var { x, ...rest2 } = t;
    return t;
}
