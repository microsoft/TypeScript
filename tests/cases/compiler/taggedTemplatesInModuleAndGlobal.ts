// @module: commonjs
// @target: es5

// @filename: global.ts
namespace n {
    function id<T>(x: T): T {
        return x;
    }

    function templateObjectFactory() {
        return id`hello world`;
    }
    let result = templateObjectFactory() === templateObjectFactory();
}
// @filename: module.ts
export { }
function id<T>(x: T): T {
    return x;
}

function templateObjectFactory() {
    return id`hello world`;
}
let result = templateObjectFactory() === templateObjectFactory();
