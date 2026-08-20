// @target: es6
// @declaration: true

// @filename: server.ts
class c {
}
interface i {
}
namespace m {
    export var x = 10;
}
var x = 10;
namespace uninstantiated {
}
export { c };
export { c as c2 };
export { i, m as instantiatedModule };
export { uninstantiated };
export { x };