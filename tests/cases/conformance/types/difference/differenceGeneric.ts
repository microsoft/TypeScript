// @declaration: true
// @target: es5
interface Gen {
    x: number;
}
interface Gen2 {
    parent: Gen;
    millenial: string;
}
function cloneAgain<T extends Gen & Gen2>(t: T): T - (x) {
    // declarations with generics create difference types
    let rest: T - (x);
    let rest1: T - (x) - (parent, millenial);
    var { x, parent, ...rest2 } = t;
    // apparent types distribute the intersection constraint correctly
    rest.parent;
    rest.millenial;
    rest2.millenial;
    ({ x, parent, ...rest2 } = t);
    return rest2; // TODO: T - (x, parent) shouldn't be assignable to T - (x)
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
