//// [tests/cases/compiler/es6ExportClauseWithoutModuleSpecifier.ts] ////

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
export { c } from "server";
export { c as c2 } from "server";
export { i, m as instantiatedModule } from "server";
export { uninstantiated } from "server";
export { x } from "server";

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
export { c } from "server";
export { c as c2 } from "server";
export { i, m as instantiatedModule } from "server";
export { uninstantiated } from "server";
export { x } from "server";


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
export { c } from "server";
export { c as c2 } from "server";
export { i, m as instantiatedModule } from "server";
export { uninstantiated } from "server";
export { x } from "server";
