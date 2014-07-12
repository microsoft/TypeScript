//// [genericNewInterface.js]
// bug 771191: Generic new() Interface contract not enforced
function createInstance(ctor) {
    return new ctor(42);
}

function createInstance2(ctor) {
    return new ctor(1024);
}
