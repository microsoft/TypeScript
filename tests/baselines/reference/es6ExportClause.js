//// [tests/cases/compiler/es6ExportClause.ts] ////

//// [server.ts]
class c {
}
interface i {
}
module m {
    export var x = 10;
}
var x = 10;
module uninstantiated {
}
export { c };
export { c as c2 };
export { i, m as instantiatedModule };
export { uninstantiated };
export { x };

//// [server.js]
class c {
}
var m;
(function (m) {
    m.x = 10;
})(m || (m = {}));
var x = 10;
export { c };
export { c as c2 };
export { m as instantiatedModule };
export { x };


//// [server.d.ts]
declare class c {
}
interface i {
}
declare namespace m {
    var x: number;
}
declare var x: number;
declare namespace uninstantiated {
}
export { c };
export { c as c2 };
export { i, m as instantiatedModule };
export { uninstantiated };
export { x };
