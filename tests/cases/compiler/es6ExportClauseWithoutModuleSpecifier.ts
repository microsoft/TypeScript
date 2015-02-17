// @target: es6
// @declaration: true

// @filename: server.ts
export class c {
}
export interface i {
}
export module m {
    export var x = 10;
}
export var x = 10;
export module uninstantiated {
}

// @filename: client.ts
export { c } from "server";
export { c as c2 } from "server";
export { i, m as instantiatedModule } from "server";
export { uninstantiated } from "server";
export { x } from "server";