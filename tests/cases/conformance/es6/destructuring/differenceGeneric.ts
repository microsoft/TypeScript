// @declaration: true
interface Gen {
    x: number;
}
interface Gen2 {
    parent: Gen;
    millenial: string;
}
function cloneAgain<T extends Gen & Gen2>(t: T): T - Gen {
    let y: Gen;
    // declarations with generics create difference types
    let rest: T - Gen;
    let rest1: T - Gen - Gen2;
    var { x, ...rest2 } = t;
    // apparent types distribute the intersection constraint correctly
    rest.parent;
    rest.millenial;
    rest2.parent;
    rest2.millenial;
    return rest2;
}
interface Gen3 extends Gen2 {
    x: number;
    w: boolean;
}
let gen3: Gen3;
let rested = cloneAgain(gen3);
rested.parent;
rested.millenial;
rested.w;
