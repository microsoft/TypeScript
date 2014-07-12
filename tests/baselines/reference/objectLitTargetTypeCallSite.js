//// [objectLitTargetTypeCallSite.js]
function process(x) {
    return x.a;
}

process({ a: true, b: "y" });
