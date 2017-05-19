function a() {
    let global = 1;
}
function b() {
    class global {}
}

namespace global {
}

function foo(global: number) {
}

let obj = {
    global: "123"
}