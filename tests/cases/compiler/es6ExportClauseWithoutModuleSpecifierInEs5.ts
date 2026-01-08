// @target: es5
// @module: commonjs
// @declaration: true

// @filename: server.ts
export class c {
}
export interface i {
}
export namespace m {
    export var x = 10;
}
export var x = 10;
export namespace uninstantiated {
}

// @filename: client.ts
export { c } from "./server";
export { c as c2 } from "./server";
export { i, m as instantiatedModule } from "./server";
export { uninstantiated } from "./server";
export { x } from "./server";