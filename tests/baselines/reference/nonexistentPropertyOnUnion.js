//// [nonexistentPropertyOnUnion.ts]
function f(x: string | Promise<string>) {
    x.toLowerCase();
}


//// [nonexistentPropertyOnUnion.js]
function f(x) {
    x.toLowerCase();
}
