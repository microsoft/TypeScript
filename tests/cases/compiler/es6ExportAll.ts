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
export * from "server";