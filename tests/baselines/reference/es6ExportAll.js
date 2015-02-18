//// [tests/cases/compiler/es6ExportAll.ts] ////

//// [server.ts]

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

//// [client.ts]
export * from "server";

//// [server.js]
var c = (function () {
    function c() {
    }
    return c;
})();
export { c };
var m;
(function (m) {
    m.x = 10;
})(m || (m = {}));
export { m };
export var x = 10;
//// [client.js]
export * from "server";


//// [server.d.ts]
export declare class c {
}
export interface i {
}
export declare module m {
    var x: number;
}
export declare var x: number;
export declare module uninstantiated {
}
//// [client.d.ts]
export * from "server";
