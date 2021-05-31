// @target: esnext

async function foo(x: any) {
    var async;
    for await (async of x) {}
}
